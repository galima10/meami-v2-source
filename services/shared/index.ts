import { getDb } from "@database/database";
import type {
  QuantityField,
  QuantityTable,
  QuantityCondition,
  Operation,
} from "@app-types/DbQuantity";
import { toDbNumber } from "helpers/dbHelpers";

export async function UpdateQuantityGenericService(
  table: QuantityTable,
  field: QuantityField,
  condition: QuantityCondition,
  itemId: number,
  value: number | null,
  operation: Operation = "set",
  extra?: { condition: QuantityCondition; id: number },
) {
  const db = await getDb();

  const dbValue = value ? toDbNumber(value) : null;

  const operationSql =
    operation === "set"
      ? `${field} = ?`
      : operation === "increment"
        ? `${field} = ${field} + ?`
        : `${field} = MAX(0, ${field} - ?)`;

  const whereClause = extra
    ? `${condition} = ? AND ${extra.condition} = ?`
    : `${condition} = ?`;

  const params = extra ? [dbValue, itemId, extra.id] : [dbValue, itemId];

  await db.runAsync(
    `
    UPDATE ${table}
    SET ${operationSql}
    WHERE ${whereClause}
    `,
    params,
  );
}

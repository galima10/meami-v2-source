import { getDb } from "@database/database";
import type {
  QuantityField,
  QuantityTable,
  QuantityCondition,
  Operation,
} from "@app-types/DbQuantity";

export async function UpdateQuantityGenericService(
  table: QuantityTable,
  field: QuantityField,
  condition: QuantityCondition,
  itemId: number,
  value: number,
  operation: Operation = "set",
) {
  const db = await getDb();
  const operationSql =
    operation === "set"
      ? `${field} = ?`
      : operation === "increment"
        ? `${field} = ${field} + ?`
        : `${field} = MAX(0, ${field} - ?)`;
  await db.runAsync(
    `
    UPDATE ${table}
    SET ${operationSql}
    WHERE ${condition} = ?
    `,
    [value, itemId],
  );
}

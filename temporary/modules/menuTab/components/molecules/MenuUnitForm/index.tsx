import { View, StyleSheet } from "react-native";
import AppInput from "@modules/shared/components/primitives/AppInput";
import AppButton from "@modules/shared/components/atoms/buttons/AppButton";
import { Dispatch, SetStateAction } from "react";
import { FONT_BASE } from "@constants/general";
import { useAppDispatch, useAppSelector } from "@modules/shared/hooks/redux";
import {
  updateUnitThunk,
  createUnitThunk,
  deleteUnitThunk,
} from "@stores/thunks/units";
import type { Unit } from "@stores/features/units";

interface MenuUnitFormProps {
  setIsSetted: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<
    SetStateAction<{
      id: number | null;
      name: string;
      abbreviation: string;
    }>
  >;
  formData: {
    id: number | null;
    name: string;
    abbreviation: string;
  };
}

export default function MenuUnitForm({
  setIsSetted,
  setFormData,
  formData,
}: MenuUnitFormProps) {
  const dispatch = useAppDispatch();
  const { units } = useAppSelector((state) => state.unit);
  function handleValidate() {
    const fomrDataValue = formData;
    if (!fomrDataValue.name || !fomrDataValue.abbreviation) return;
    for (const unit of Object.values(units) as Unit[]) {
      if (unit.name === fomrDataValue.name) return;
    }

    if (!fomrDataValue.id)
      dispatch(
        createUnitThunk({
          name: fomrDataValue.name,
          abbreviation: fomrDataValue.abbreviation,
        }),
      );
    else {
      dispatch(
        updateUnitThunk({
          [fomrDataValue.id]: {
            name: fomrDataValue.name,
            abbreviation: fomrDataValue.abbreviation,
          },
        }),
      );
    }
    setIsSetted(false);
    setFormData({
      id: null,
      name: "",
      abbreviation: "",
    });
  }
  async function handleDeleteUnit() {
    const fomrDataValue = formData;
    if (!fomrDataValue.id) return;
    dispatch(deleteUnitThunk(fomrDataValue.id));
    setIsSetted(false);
    setFormData({
      id: null,
      name: "",
      abbreviation: "",
    });
  }
  return (
    <View style={styles.setContent}>
      <View style={styles.inputs}>
        <AppInput
          style={styles.input}
          placeholder="Nom"
          rounded
          onChangeText={(value) =>
            setFormData((prev) => ({
              ...prev,
              name: value,
            }))
          }
          value={formData.name}
        />
        <AppInput
          style={styles.input}
          placeholder="Abbréviation"
          rounded
          onChangeText={(value) =>
            setFormData((prev) => ({
              ...prev,
              abbreviation: value,
            }))
          }
          value={formData.abbreviation}
        />
      </View>
      <View style={styles.inputs}>
        <AppButton
          label="Valider"
          type="primary"
          color="green"
          big
          action={handleValidate}
        />
        <AppButton
          label="Supprimer"
          type="tertiary"
          big
          action={handleDeleteUnit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    paddingHorizontal: FONT_BASE,
    gap: FONT_BASE,
  },
  input: {
    width: "100%",
    height: FONT_BASE * 2.5,
    paddingHorizontal: FONT_BASE * 0.75,
  },
  setContent: {
    gap: FONT_BASE * 3,
  },
});

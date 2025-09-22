import horseModifiers from '@/utils/modifiers/horse';
import { HorseModifier } from '@/utils/modifiers/horse/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModifierState {
    activeModifiers: {
        horse: HorseModifier[];
    };
}

const initialState: ModifierState = {
    activeModifiers: {
        horse: [],
    },
};

const modifierSlice = createSlice({
    name: 'modifier',
    initialState,
    reducers: {
        enableModifier(
            state,
            action: PayloadAction<Pick<HorseModifier, 'id'>>,
        ) {
            const modifier = horseModifiers.find(
                (horseMod) => horseMod.id === action.payload.id,
            );
            if (modifier) {
                state.activeModifiers.horse.push(modifier);
            }
        },
        disableModifier(
            state,
            action: PayloadAction<Pick<HorseModifier, 'id'>>,
        ) {
            state.activeModifiers.horse = state.activeModifiers.horse.filter(
                (horseMod) => horseMod.id !== action.payload.id,
            );
        },
        disableAllModifiers(state) {
            state.activeModifiers.horse = [];
        },
    },
});

export const { enableModifier, disableModifier } = modifierSlice.actions;
export default modifierSlice.reducer;

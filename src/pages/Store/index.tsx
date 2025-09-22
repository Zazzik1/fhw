import React, { useCallback } from 'react'
import Product from './components/Product'
import horseModifiers from '@/utils/modifiers/horse'
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks'
import { useSignedInUser } from '@/hooks/useSignedInUser'
import { disableModifier, enableModifier } from '@/redux/slices/modifierSlice'

import styles from './Store.module.css'

const Shop = () => {
    const { userScore } = useSignedInUser();
    const activeProductIds = new Set(useAppSelector(state => state.modifier.activeModifiers.horse).map(mod => mod.id))
    const dispatch = useAppDispatch();
    const handleClick = useCallback((id: number) => {
        if (activeProductIds.has(id)) {
            dispatch(disableModifier({ id }));
        } else {
            dispatch(enableModifier({ id }));
        }
    }, [activeProductIds, disableModifier, enableModifier, dispatch])
    return (
        <>
            <div style={{ color: 'yellow', marginBottom: '24px' }}>wybierz modyfikacje do swojego konia</div>
            <div className={styles.products}>
                {horseModifiers.map(mod => (
                    <Product
                        key={mod.id}
                        id={mod.id}
                        icon={mod.icon}
                        name={mod.name}
                        iconWidth={mod.width * mod.scaleInStore}
                        iconHeight={mod.height * mod.scaleInStore}
                        isEnabled={activeProductIds.has(mod.id)}
                        isUnlocked={userScore >= mod.cost}
                        cost={mod.cost}
                        onClick={handleClick}
                    />
                ))}
            </div>
        </>
    )
}

export default Shop
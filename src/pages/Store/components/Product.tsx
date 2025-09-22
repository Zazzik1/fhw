import React, { useCallback } from 'react'
import styles from '../Store.module.css'

export type Props = {
    id: number;
    name: string;
    /**
     * Image name from the assets folder
     */
    icon: string;
    iconWidth: number;
    iconHeight: number;
    isEnabled: boolean;
    /**
     * isUnlocked === true -> user can enable the modifier
     * (has enough score)
     */
    isUnlocked: boolean;
    /**
     * A score required to get this product
     */
    cost: number;
    onClick: (id: number) => void;
}

const Product = ({
    id,
    name,
    iconWidth,
    iconHeight,
    icon,
    isEnabled,
    isUnlocked,
    cost,
    onClick,
}: Props) => {
    const handleClick = useCallback(() => {
        if (isUnlocked) onClick(id);
    }, [id, isUnlocked, onClick])
    return (
        <div
            className={[
                styles.product,
                isEnabled ? styles.enabled : '',
                isUnlocked ? styles.unlocked : '',
            ].join(' ')}
            onClick={handleClick}
        >
            <div>
                <img src="/assets/horse.png" width={iconWidth} height={iconHeight} style={{ position: 'absolute', zIndex: '-1' }} />
                <img src={`/assets/${icon}`} width={iconHeight} height={iconWidth} />
            </div>
            <div>
                <div>
                    {name}
                </div>
                <div className={styles.product_cost}>
                    {!isUnlocked ? `Przeskocz ${cost} aby odblokować!` : 'Odblokowano'}
                </div>
            </div>
        </div>
    )
}

export default Product
import React, { useState, ChangeEvent, useRef } from "react";

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";
type MainMealType = Exclude<MealType, "snacks">;

interface MealFood {
    idx: number;
    foodName: string;
    imageUrl: string;
    kcal: number;
    regDate: string;
    mealIdx: number;
}

interface Meal {
    idx: number;
    userId: string;
    mealType: string;
    regDate: string;
}


const MEAL_LABEL: Record<MealType, string> = {
    breakfast: "아침",
    lunch: "점심",
    dinner: "저녁",
    snacks: "간식",
}


const MealForm = () => {
    const [meals, setMeals] = useState({
        breakfast: {
            items: [''],
            image: null as File | null
        },
        lunch: {
            items: [''],
            image: null as File | null
        },
        dinner: {
            items: [''],
            image: null as File | null
        },
        snacks: [] as string[]
    });
    const [currentMealType, setCurrentMealType] = useState<'breakfast' | 'lunch' | 'dinner' | ''>('');
    const fileRef = useRef<HTMLInputElement | null>(null);


    const addMealItem = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
        if (mealType === 'snacks') {
            setMeals(prev => ({
                ...prev,
                snacks: [...prev.snacks, '']
            }));
        } else {
            setMeals(prev => ({
                ...prev,
                [mealType]: {
                    ...prev[mealType],
                    items: [...prev[mealType].items, '']
                }
            }));
        }
    };

    const updateMealItem = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', index: number, value: string) => {
        if (mealType === 'snacks') {
            setMeals(prev => ({
                ...prev,
                snacks: prev.snacks.map((item, i) => i === index ? value:item)
            }));
        } else {
            setMeals(prev => ({
                ...prev,
                [mealType]: {
                    ...prev[mealType],
                    items: prev[mealType].items.map((item, i) => i === index ? value : item)
                }
            }));
        }
    };

    const removeMealItem = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', index: number) => {
        if (mealType === 'snacks') {
            setMeals(prev => ({
                ...prev,
                snacks: prev.snacks.filter((_, i) => i !== index)
            }))
        } else {
            setMeals(prev => ({
                ...prev,
                [mealType]: {
                    ...prev[mealType],
                    items: prev[mealType].items.filter((_, i) => i !== index)
                }
            }));
        }
    };

    const handleFileButtonClick = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
        setCurrentMealType(mealType);
        fileRef.current?.click();
    };

    const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file && currentMealType) {
            setMeals((prev => ({
                ...prev,
                [currentMealType]: {
                    ...prev[currentMealType],
                    image: file
                }
            })));
        }
    };

    const getImagePreview = (file: File | null): string | undefined => {
        if (!file) return undefined;
        return URL.createObjectURL(file);
    }

    return (
        <div className="card mt-4">
            <div className="meal-grid">
                <div className="meal-card">
                    <div className="meal-image-box">
                        <input type="file" accept="image/*"
                               ref={fileRef}
                               style={{display: 'none'}}
                               onChange={fileChange} />
                        <div className="meal-image-label">
                            {
                                meals.breakfast.image ? (
                                    <img
                                        src={getImagePreview(meals.breakfast.image)}
                                        alt="아침식단"
                                    />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <div className="no-image-icon"></div>
                                        <span>NO IMAGE</span>
                                    </div>
                            )}
                        </div>
                        <button type="button" className="meal-add-btn" onClick={() => handleFileButtonClick('breakfast')}>+</button>
                    </div>
                    <div className="meal_content">
                    <h4 className="meal-title">아침</h4>
                    {meals.breakfast.items.map((menu, index) => (
                        <div key={index} className="meal-name-input">
                            <input 
                                type="text" 
                                placeholder="아침메뉴 입력" 
                                className="meal-name-field"
                                value={menu}
                                onChange={(e) => updateMealItem('breakfast', index, e.target.value)}
                            />
                            {index === 0 && (
                                <button type="button" className="meal-name-add-btn" onClick={() => addMealItem('breakfast')}>+</button>
                            )}
                            {index > 0 && (
                                <button type="button" className="meal-name-delete-btn" onClick={() => removeMealItem('breakfast', index)}>-</button>
                            )}
                        </div>
                    ))}
                    <div className="meal-calories-input">
                        <span className="calories-label">총</span>
                        <div className="calories-right">
                            <input type="number" placeholder="0" className="calories-field" />
                            <span className="calories-unit">kcal</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="meal-card">
                    <div className="meal-image-box">
                        <div className="meal-image-label">
                            {
                                meals.lunch.image ? (
                                    <img
                                        src={getImagePreview(meals.lunch.image)}
                                        alt="점심식단"
                                    />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <div className="no-image-icon"></div>
                                        <span>NO IMAGE</span>
                                    </div>
                                )
                            }
                        </div>
                        <button type="button" className="meal-add-btn" onClick={() => handleFileButtonClick('lunch')}>+</button>
                    </div>
                    <div className="meal_content">
                    <h4 className="meal-title">점심</h4>
                    {meals.lunch.items.map((menu, index) => (
                        <div key={index} className="meal-name-input">
                            <input 
                                type="text" 
                                placeholder="점심메뉴 입력" 
                                className="meal-name-field"
                                value={menu}
                                onChange={(e) => updateMealItem('lunch', index, e.target.value)}
                            />
                            {index === 0 && (
                                <button type="button" className="meal-name-add-btn" onClick={() => addMealItem('lunch')}>+</button>
                            )}
                            {index > 0 && (
                                <button type="button" className="meal-name-delete-btn" onClick={() => removeMealItem('lunch', index)}>-</button>
                            )}
                        </div>
                    ))}
                    <div className="meal-calories-input">
                        <span className="calories-label">총</span>
                        <div className="calories-right">
                            <input type="number" placeholder="0" className="calories-field" />
                            <span className="calories-unit">kcal</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="meal-card">
                    <div className="meal-image-box">
                        <div className="meal-image-label">
                            {
                                meals.dinner.image ? (
                                    <img
                                        src={getImagePreview(meals.dinner.image)}
                                        alt="저녁식단"
                                    />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <div className="no-image-icon"></div>
                                        <span>NO IMAGE</span>
                                    </div>
                                )
                            }
                        </div>
                        <button type="button" className="meal-add-btn" onClick={() => handleFileButtonClick('dinner')}>+</button>
                    </div>
                    <div className="meal_content">
                    <h4 className="meal-title">저녁</h4>
                    {meals.dinner.items.map((menu, index) => (
                        <div key={index} className="meal-name-input">
                            <input 
                                type="text" 
                                placeholder="저녁메뉴 입력" 
                                className="meal-name-field"
                                value={menu}
                                onChange={(e) => updateMealItem('dinner', index, e.target.value)}
                            />
                            {index === 0 && (
                                <button type="button" className="meal-name-add-btn" onClick={() => addMealItem('dinner')}>+</button>
                            )}
                            {index > 0 && (
                                <button type="button" className="meal-name-delete-btn" onClick={() => removeMealItem('dinner', index)}>-</button>
                            )}
                        </div>
                    ))}
                    <div className="meal-calories-input">
                        <span className="calories-label">총</span>
                        <div className="calories-right">
                            <input type="number" placeholder="0" className="calories-field" />
                            <span className="calories-unit">kcal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="snack-section">
                <span>간식</span>
                <div className="snack-add-section">
                    {meals.snacks.map((snack, index) => (
                        <div key={index} className="snack-input-group">
                            <input 
                                type="text" 
                                placeholder="간식 입력" 
                                className="meal-name-field"
                                value={snack}
                                onChange={(e) => updateMealItem('snacks', index, e.target.value)}
                            />
                            <button type="button" className="meal-name-delete-btn" onClick={() => removeMealItem('snacks', index)}>-</button>
                        </div>
                    ))}
                    <button type="button" className="snack-add-btn" onClick={() => addMealItem('snacks')}>+</button>
                </div>
            </div>

            <hr className="mb-3" />
            <div className="total-calories">총 0 kcal</div>
        </div>
    );
};

export default MealForm;

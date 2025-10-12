import React, {useState, ChangeEvent, useRef, forwardRef, useImperativeHandle} from "react";
import {FormRef} from "@/types/form";

type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

interface MealFood {
    idx?: number;
    foodName: string;
    imageUrl?: string;
    kcal?: number;
    regDate?: string;
    mealIdx?: number;
}



const MealForm = forwardRef<FormRef>((props, ref) => {
    const [meals, setMeals] = useState({
        breakfast: {
            foods: [{ foodName: '' }] as MealFood[],
            image: null as File | null,
            kcal: 0
        },
        lunch: {
            foods: [{ foodName: '' }] as MealFood[],
            image: null as File | null,
            kcal: 0
        },
        dinner: {
            foods: [{ foodName: '' }] as MealFood[],
            image: null as File | null,
            kcal: 0
        },
        snacks: [] as MealFood[]
    });


    useImperativeHandle(ref, () => ({
        getData: () => {
            const dataChk = meals.breakfast.foods.some(food => food.foodName.trim()) ||
                meals.lunch.foods.some(food => food.foodName.trim()) ||
                meals.dinner.foods.some(food => food.foodName.trim()) ||
                meals.snacks.some(food => food.foodName.trim());

            return meals;
        },
        validate: () => {
            return meals.breakfast.foods.some(food => food.foodName.trim()) ||
                meals.lunch.foods.some(food => food.foodName.trim()) ||
                meals.dinner.foods.some(food => food.foodName.trim()) ||
                meals.snacks.some(food => food.foodName.trim());
        },

        reset: () => {
            setMeals({
                breakfast: { foods: [{ foodName: '' }], image: null, kcal: 0 },
                lunch: { foods: [{ foodName: '' }], image: null, kcal: 0 },
                dinner: { foods: [{ foodName: '' }], image: null, kcal: 0 },
                snacks: []
            });
        }
    }));



    const [currentMealType, setCurrentMealType] = useState<Exclude<MealType, 'snacks'> | ''>('');
    const fileRef = useRef<HTMLInputElement | null>(null);


    const addMealItem = (mealType: MealType) => {
        if (mealType === 'snacks') {
            setMeals(prev => ({
                ...prev,
                snacks: [...prev.snacks, { foodName: '' }]
            }));
        } else {
            setMeals(prev => ({
                ...prev,
                [mealType]: {
                    ...prev[mealType],
                    foods: [...prev[mealType].foods, { foodName: '' }]
                }
            }));
        }
    };

    const updateMealItem = (mealType: MealType, index: number, field: 'foodName', value: string) => {
        if (mealType === 'snacks') {
            setMeals(prev => ({
                ...prev,
                snacks: prev.snacks.map((food, i) => 
                    i === index ? { ...food, [field]: value } : food
                )
            }));
        } else {
            setMeals(prev => ({
                ...prev,
                [mealType]: {
                    ...prev[mealType],
                    foods: prev[mealType].foods.map((food, i) => 
                        i === index ? { ...food, [field]: value } : food
                    )
                }
            }));
        }
    };

    const updateMealKcal = (mealType: Exclude<MealType, 'snacks'>, kcal: number) => {
        setMeals(prev => ({
            ...prev,
            [mealType]: {
                ...prev[mealType],
                kcal: kcal
            }
        }));
    };

    const removeMealItem = (mealType: MealType, index: number) => {
        if (mealType === 'snacks') {
            setMeals(prev => ({
                ...prev,
                snacks: prev.snacks.filter((_, i) => i !== index)
            }));
        } else {
            setMeals(prev => ({
                ...prev,
                [mealType]: {
                    ...prev[mealType],
                    foods: prev[mealType].foods.filter((_, i) => i !== index)
                }
            }));
        }
    };

    const handleFileButtonClick = (mealType: Exclude<MealType, 'snacks'>) => {
        setCurrentMealType(mealType);
        fileRef.current?.click();
    };

    const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file && currentMealType) {
            setMeals(prev => ({
                ...prev,
                [currentMealType]: {
                    ...prev[currentMealType],
                    image: file
                }
            }));
        }
        
        // input value 초기화 (같은 파일 재선택 가능하도록)
        e.target.value = '';
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
                    {meals.breakfast.foods.map((food, index) => (
                        <div key={index} className="meal-name-input">
                            <input 
                                type="text" 
                                placeholder="아침메뉴 입력" 
                                className="meal-name-field"
                                value={food.foodName}
                                onChange={(e) => updateMealItem('breakfast', index, 'foodName', e.target.value)}
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
                            <input 
                                type="number" 
                                placeholder="0" 
                                className="calories-field"
                                value={meals.breakfast.kcal || ''}
                                onChange={(e) => updateMealKcal('breakfast', parseInt(e.target.value) || 0)}
                            />
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
                    {meals.lunch.foods.map((food, index) => (
                        <div key={index} className="meal-name-input">
                            <input 
                                type="text" 
                                placeholder="점심메뉴 입력" 
                                className="meal-name-field"
                                value={food.foodName}
                                onChange={(e) => updateMealItem('lunch', index, 'foodName', e.target.value)}
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
                            <input 
                                type="number" 
                                placeholder="0" 
                                className="calories-field"
                                value={meals.lunch.kcal || ''}
                                onChange={(e) => updateMealKcal('lunch', parseInt(e.target.value) || 0)}
                            />
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
                    {meals.dinner.foods.map((food, index) => (
                        <div key={index} className="meal-name-input">
                            <input 
                                type="text" 
                                placeholder="저녁메뉴 입력" 
                                className="meal-name-field"
                                value={food.foodName}
                                onChange={(e) => updateMealItem('dinner', index, 'foodName', e.target.value)}
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
                            <input 
                                type="number" 
                                placeholder="0" 
                                className="calories-field"
                                value={meals.dinner.kcal || ''}
                                onChange={(e) => updateMealKcal('dinner', parseInt(e.target.value) || 0)}
                            />
                            <span className="calories-unit">kcal</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <div className="snack-section">
                <span>간식</span>
                <div className="snack-add-section">
                    {meals.snacks.map((food, index) => (
                        <div key={index} className="snack-input-group">
                            <input 
                                type="text" 
                                placeholder="간식 입력" 
                                className="meal-name-field"
                                value={food.foodName}
                                onChange={(e) => updateMealItem('snacks', index, 'foodName', e.target.value)}
                            />
                            <button type="button" className="meal-name-delete-btn" onClick={() => removeMealItem('snacks', index)}>-</button>
                        </div>
                    ))}
                    <button type="button" className="snack-add-btn" onClick={() => addMealItem('snacks')}>+</button>
                </div>
            </div>

            <hr className="mb-3" />
            <div className="total-calories">
                총 {meals.breakfast.kcal + meals.lunch.kcal + meals.dinner.kcal} kcal
            </div>
        </div>
    );
});

export default MealForm;

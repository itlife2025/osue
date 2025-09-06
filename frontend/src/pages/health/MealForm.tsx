import React, { useState } from "react";

const MealForm = () => {
    const [meals, setMeals] = useState({
        breakfast: [''],
        lunch: [''],
        dinner: [''],
        snacks: [] as string[]
    });

    const addMealItem = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
        setMeals(prev => ({
            ...prev,
            [mealType]: [...prev[mealType], '']
        }));
    };

    const updateMealItem = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', index: number, value: string) => {
        setMeals(prev => ({
            ...prev,
            [mealType]: prev[mealType].map((item, i) => i === index ? value : item)
        }));
    };

    const removeMealItem = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', index: number) => {
        setMeals(prev => ({
            ...prev,
            [mealType]: prev[mealType].filter((_, i) => i !== index)
        }));
    };
    return (
        <div className="card mt-4">
            <div className="meal-grid">
                <div className="meal-card">
                    <div className="meal-image-box">
                        <input type="file" id="breakfast-image" accept="image/*" style={{display: 'none'}} />
                        <div className="meal-image-label">
                            <div className="no-image-placeholder">
                                <div className="no-image-icon"></div>
                                <span>NO IMAGE</span>
                            </div>
                        </div>
                        <button type="button" className="meal-add-btn" onClick={() => document.getElementById('breakfast-image')?.click()}>+</button>
                    </div>
                    <div className="meal_content">
                    <h4 className="meal-title">아침</h4>
                    {meals.breakfast.map((menu, index) => (
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
                        <input type="file" id="lunch-image" accept="image/*" style={{display: 'none'}} />
                        <div className="meal-image-label">
                            <div className="no-image-placeholder">
                                <div className="no-image-icon"></div>
                                <span>NO IMAGE</span>
                            </div>
                        </div>
                        <button type="button" className="meal-add-btn" onClick={() => document.getElementById('lunch-image')?.click()}>+</button>
                    </div>
                    <div className="meal_content">
                    <h4 className="meal-title">점심</h4>
                    {meals.lunch.map((menu, index) => (
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
                        <input type="file" id="dinner-image" accept="image/*" style={{display: 'none'}} />
                        <div className="meal-image-label">
                            <div className="no-image-placeholder">
                                <div className="no-image-icon"></div>
                                <span>NO IMAGE</span>
                            </div>
                        </div>
                        <button type="button" className="meal-add-btn" onClick={() => document.getElementById('dinner-image')?.click()}>+</button>
                    </div>
                    <div className="meal_content">
                    <h4 className="meal-title">저녁</h4>
                    {meals.dinner.map((menu, index) => (
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

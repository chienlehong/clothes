<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_name'=>fake()->name(),
            'price'=>'10000',
            'image'=>'không có',
            'description'=>'mô tả',
            'brand_id'=>1,
            'category_id'=>1,
        ];
    }
}

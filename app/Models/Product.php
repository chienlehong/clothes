<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_name',
        'price',
        'image',
        'description',
        'brand_id',
        'category_id',
        'gender_id',
        'color_id',
        'size_id'
    ];
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }
    public static function getDifferentProducts($limit = 5)
    {
        return self::inRandomOrder()->limit($limit)->get();
    }

    public static function Products($limit = 10)
    {
        return self::distinct()->inRandomOrder()->limit($limit)->get();
    }
    public static function Product($limit = 10)
    {
        return self::distinct()->inRandomOrder()->limit($limit)->get();
    }
    public function cart(){
        return $this->hasMany(Cart::class);
    }
}

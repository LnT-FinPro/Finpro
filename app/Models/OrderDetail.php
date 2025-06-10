<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Guid\Guid;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Testing\Fluent\Concerns\Has;

class OrderDetail extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
    ];

    /**
     * Relasi dengan Order
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Relasi dengan Product
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

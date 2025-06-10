<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Guid\Guid;
use Ramsey\Uuid\Guid\GuidInterface;
use Ramsey\Uuid\Rfc4122\FieldsInterface;
use Ramsey\Uuid\Rfc4122\FieldsInterface as UUID;

class Product extends Model
{
    use HasFactory;

    // Mengatur agar id bukan auto-increment
    public $incrementing = false;

    // Tipe kunci adalah string karena UUID
    protected $keyType = 'string';

    // Mengatur kolom yang bisa diisi mass-assignment
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'image',
    ];

    /**
     * Inisialisasi UUID saat model dibuat.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) \Ramsey\Uuid\Guid\Guid::uuid4();
            }
        });
    }

    /**
     * Relasi dengan cart (jika ada)
     */
    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    /**
     * Relasi dengan order details (jika ada)
     */
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    /**
     * Relasi dengan reviews (jika ada)
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}

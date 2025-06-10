<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Guid\Guid;

class OrderDetail extends Model
{
    use HasFactory;

    // Mengatur agar id bukan auto-increment
    public $incrementing = false;

    // Tipe kunci adalah string karena UUID
    protected $keyType = 'string';

    // Kolom yang dapat diisi
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
    ];

    /**
     * Inisialisasi UUID saat model dibuat.
     */
    protected static function boot()
    {
        parent::boot();

        // Menambahkan UUID secara otomatis sebelum data disimpan
        static::creating(function ($model) {
            // Jika id tidak ada, maka kita buat UUID baru
            if (empty($model->{$model->getKeyName()})) {
                // Generate UUID menggunakan Ramsey UUID
                $model->{$model->getKeyName()} = (string) \Ramsey\Uuid\Guid\Guid::uuid4();
            }
        });
    }

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

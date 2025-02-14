"use client"

import { useState } from 'react';
import Head from 'next/head';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Produk Premium 1',
    price: 100000,
    description: 'Produk berkualitas tinggi dengan bahan premium',
    image: '/images/produk.png'
  },
  {
    id: 2,
    name: 'Produk Premium 2',
    price: 150000,
    description: 'Produk terbaik dengan desain eksklusif',
    image: '/images/produk.png'
  },
  {
    id: 3,
    name: 'Produk Premium 3',
    price: 200000,
    description: 'Produk unggulan dengan kualitas terjamin',
    image: '/images/produk.png'
  },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    nama: '',
    email: '',
    telepon: '',
    alamat: '',
    kota: '',
    kodePos: '',
    catatan: '',
    metodePembayaran: 'transfer_bank'
  });
  
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const checkout = () => {
    const message = `*DETAIL PESANAN*
================

*Data Pemesan:*
Nama: ${orderData.nama}
Email: ${orderData.email}
Telepon: ${orderData.telepon}

*Alamat Pengiriman:*
${orderData.alamat}
${orderData.kota}
${orderData.kodePos}

*Detail Pesanan:*
${cart.map(item => `- ${item.name}
  ${item.quantity}x @ ${formatCurrency(item.price)}
  Subtotal: ${formatCurrency(item.price * item.quantity)}`).join('\n\n')}

*Total Pesanan: ${formatCurrency(getTotalAmount())}*

*Metode Pembayaran:*
${orderData.metodePembayaran.replace('_', ' ').toUpperCase()}

*Catatan Tambahan:*
${orderData.catatan || '-'}

================
Terima kasih telah berbelanja!`;

    const encodedMessage = encodeURIComponent(message);
    const waNumber = '6282147840202'; 
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Premium Store</title>
        <meta name="description" content="Toko premium dengan produk berkualitas" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-10">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold ">Premium Store</h1>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="font-semibold">{cart.length}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-52 pb-12">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/header.jpg')`,
            filter: 'brightness(0.7)'
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-5xl font-bold mb-6">Produk Premium Berkualitas</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Temukan koleksi produk premium kami dengan kualitas terbaik dan pelayanan yang memuaskan</p>
        </div>
      </section>

      {/* Tentang Kami dengan Image */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/images/tentang-kami.jpg" alt="Tentang Kami" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Tentang Kami</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Kami adalah perusahaan yang berdedikasi untuk menyediakan produk premium berkualitas tinggi.
                Dengan pengalaman lebih dari 10 tahun di industri ini, kami telah melayani ribuan pelanggan
                dengan tingkat kepuasan yang tinggi.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <img src="/logo/badge.png" alt="Icon" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Kualitas Premium</h3>
                    <p className="text-gray-600">Produk terbaik dengan standar kualitas tinggi</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <img src="/logo/customer-review.png" alt="Icon" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Pelayanan Terbaik</h3>
                    <p className="text-gray-600">Pelayanan pelanggan 24/7 yang responsif</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produk dengan Card Design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Produk Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold ">{formatCurrency(product.price)}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Dialog */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Keranjang Belanja</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Keranjang belanja Anda masih kosong</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600">{formatCurrency(item.price)}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)} 
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Minus size={16} />
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)} 
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-red-500 hover:text-red-600 mt-2"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>{formatCurrency(getTotalAmount())}</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsCheckoutOpen(true);
                        setIsCartOpen(false);
                      }}
                      className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      Lanjut ke Pembayaran
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Dialog */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Form Pemesanan</h2>
                <button onClick={() => setIsCheckoutOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); checkout(); }} className="space-y-6">
                {/* Data Diri */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Data Diri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap*</label>
                      <input
                        type="text"
                        name="nama"
                        required
                        value={orderData.nama}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={orderData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="contoh@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon/WhatsApp*</label>
                    <input
                      type="tel"
                      name="telepon"
                      required
                      value={orderData.telepon}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="081234567890"
                    />
                  </div>
                </div>

                {/* Alamat Pengiriman */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Alamat Pengiriman</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap*</label>
                    <textarea
                      name="alamat"
                      required
                      value={orderData.alamat}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten*</label>
                      <input
                        type="text"
                        name="kota"
                        required
                        value={orderData.kota}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Nama kota/kabupaten"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos*</label>
                      <input
                        type="text"
                        name="kodePos"
                        required
                        value={orderData.kodePos}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="12345"
                      />
                    </div>
                  </div>
                </div>

                {/* Metode Pembayaran */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Metode Pembayaran</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="relative border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                      <input
                        type="radio"
                        name="metodePembayaran"
                        value="transfer_bank"
                        checked={orderData.metodePembayaran === 'transfer_bank'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center">
                        <span className="font-medium">Transfer Bank</span>
                        <span className="text-sm text-gray-500">BCA, Mandiri, BNI</span>
                      </div>
                      {orderData.metodePembayaran === 'transfer_bank' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </label>
                    <label className="relative border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                      <input
                        type="radio"
                        name="metodePembayaran"
                        value="e_wallet"
                        checked={orderData.metodePembayaran === 'e_wallet'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center">
                        <span className="font-medium">E-Wallet</span>
                        <span className="text-sm text-gray-500">DANA, OVO, GoPay</span>
                      </div>
                      {orderData.metodePembayaran === 'e_wallet' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </label>
                    <label className="relative border rounded-lg p-4 cursor-pointer hover:border-blue-500">
                      <input
                        type="radio"
                        name="metodePembayaran"
                        value="cod"
                        checked={orderData.metodePembayaran === 'cod'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex flex-col items-center">
                        <span className="font-medium">COD</span>
                        <span className="text-sm text-gray-500">Bayar di Tempat</span>
                      </div>
                      {orderData.metodePembayaran === 'cod' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Catatan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan</label>
                  <textarea
                    name="catatan"
                    value={orderData.catatan}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Catatan khusus untuk pesanan (warna, ukuran, dll)"
                  />
                </div>

                {/* Ringkasan Pesanan */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h3>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.quantity} x {formatCurrency(item.price)}</p>
                          </div>
                        </div>
                        <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                    
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(getTotalAmount())}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Ongkos Kirim</span>
                        <span className="text-green-600">Gratis</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-3">
                        <span>Total</span>
                        <span>{formatCurrency(getTotalAmount())}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors text-lg"
                >
                  Pesan Sekarang via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Premium Store</h3>
              <p className="text-gray-400">Kualitas premium untuk kepuasan Anda</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@premiumstore.com</li>
                <li>Telepon: (021) 1234-5678</li>
                <li>WhatsApp: 0812-3456-7890</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Alamat</h4>
              <p className="text-gray-400">
                Jl. Premium No. 123<br />
                Jakarta Selatan<br />
                Indonesia 12345
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Jam Operasional</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Senin - Jumat: 09:00 - 17:00</li>
                <li>Sabtu: 09:00 - 15:00</li>
                <li>Minggu: Tutup</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; Made by : Alfinhi Hajid Dhia. All right reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );  

}
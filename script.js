const form = document.getElementById('formPesanan');
const hasilTotal = document.getElementById('hasilTotal');

const daftarHarga = {
    "matcha latte": 18000,
    "espresso": 12000,
    "americano": 13000,
    "cappuccino": 15000,
    "latte": 16000,
    "mocha": 17000,
    "flat white": 16000,
    "iced americano": 14000,
    "iced latte": 17000,
    "cold brew": 20000,
    "chai latte": 16000,
    "hot chocolate": 15000,
    "caramel macchiato": 18000,
    "vanilla latte": 17000,
    "coffee frappe": 22000,
    "croissant": 12000,
    "muffin": 15000,
    "brownies": 18000,
    "chicken sandwich": 25000,
    "pancakes": 20000
};

form.addEventListener('submit', function handleSubmit(e) {
    e.preventDefault();

    const inputPesanan = document.getElementById('pesanan').value
        .toLowerCase()
        .replace(/[,.\n]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    let total = 0;
    let ditemukan = false;
    let detailPesanan = ''; // String untuk menyimpan detail pesanan

    for (let menu in daftarHarga) {
        const regex = new RegExp(`(\\d+)\\s+${menu}`, 'gi'); // Perbaiki regex
        let match;
        while ((match = regex.exec(inputPesanan)) !== null) {
            const qty = parseInt(match[1]);
            total += qty * daftarHarga[menu];
            ditemukan = true;
            detailPesanan += `${qty} ${menu} (Rp ${daftarHarga[menu].toLocaleString('id-ID')})\n`; // Tambahkan detail pesanan
        }
    }

    if (ditemukan && total > 0) {
        hasilTotal.innerHTML = `✅ Total pembayaran kamu: <strong class="text-success">Rp ${total.toLocaleString('id-ID')}</strong>`;
        
        // Tampilkan alert dengan detail pesanan
        alert(`Pesanan kamu:\n${detailPesanan}Total: Rp ${total.toLocaleString('id-ID')}`);

        setTimeout(() => form.submit(), 2000); // Kirim form setelah 2 detik
    } else {
        hasilTotal.innerHTML = `⚠️ Pesanan tidak dikenali. Contoh: <em>2 iced latte, 1 croissant</em>`;
    }
});

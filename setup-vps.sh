#!/bin/bash

# Script khusus VPS 2GB RAM untuk Build & Deploy
echo "🚀 Memulai Setup Pancasila Edu Portal (Mode VPS Ringan)"
echo "--------------------------------------------------------"

# Pastikan folder uploads ada untuk backend
mkdir -p backend/uploads

echo "📦 Membangun Frontend (Lokal di VPS)..."
# Karena RAM kecil, kita pastikan limit cache npm mati
cd frontend
if ! command -v npm &> /dev/null; then
    echo "❌ npm tidak ditemukan. Harap pastikan Node.js terinstall di VPS."
    exit 1
fi

echo ">> Instalasi dependensi frontend..."
npm install --no-audit --no-fund --legacy-peer-deps

echo ">> Membangun static files frontend..."
NODE_OPTIONS="--max-old-space-size=512" npm run build

# Kembali ke root
cd ..

echo "🐳 Membangun dan Menjalankan Docker Containers..."
# Hentikan container lama jika ada
docker-compose down

# Build ulang container dengan env production
echo ">> Konfigurasi produksi..."
docker-compose up -d --build

echo ""
echo "✅ DEPLOYMENT SELESAI!"
echo "Akses aplikasi di: http://localhost"
echo "Untuk melihat log backend: docker logs pancasila-backend -f"
echo "--------------------------------------------------------"

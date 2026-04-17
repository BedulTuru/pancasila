# Gunakan alpine untuk stage Nginx agar RAM usage sangat kecil (< 15MB)
FROM nginx:alpine

# Copy konfigurasi custom Nginx untuk SPA dan performa tinggi di VPS kecil
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build hasil dari local (karena build di VPS 2GB dengan npm install bisa bikin OOM / mati)
# Asumsinya di CI/CD atau local sudah build `npm run build`
COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

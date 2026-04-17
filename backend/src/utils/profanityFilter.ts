/**
 * MODERASI KONTEN (Sistem Sensor Kata Kasar)
 * Mendukung: Indonesia (Baku/Gaul), Inggris, dan Daerah (Jawa/Sunda).
 */

const BAD_WORDS_ID = [
    // Baku & Vulgar
    'anjing', 'babi', 'monyet', 'bangsat', 'brengsek', 'kontol', 'memek', 'ngentot', 'perek', 'pelacur', 'lonte',
    'bajingan', 'asu', 'jancok', 'ancuk', 'goblok', 'tolol', 'idiot', 'bego', 'pantek', 'puki', 'itil', 'jablay',
    'bencong', 'maho', 'setan', 'iblis', 'dajjal', 'biadab', 'keparat', 'tai', 'tae', 'taeek', 'kampret',
    // Slang & Gaul (Organic)
    'anjir', 'anjrit', 'anying', 'anjrot', 'anjirun', 'bajirut', 'anjeng', 'kntl', 'mmk', 'ngntt', 'asui', 'ancuker',
    'gokil', 'tolol', 'dongok', 'dungu', 'bgst', 'lont', 'peler', 'pler', 'peli', 'jembut', 'memekz',
];

const BAD_WORDS_EN = [
    'fuck', 'shit', 'asshole', 'bitch', 'bastard', 'cunt', 'dick', 'pussy', 'faggot', 'nigger', 'cock', 'slut', 'whore',
    'fk', 'st', 'fck', 'shithead', 'motherfucker', 'dumbass'
];

const BAD_WORDS_REGION = [
    // Jawa
    'raimu', 'matamu', 'ndasmu', 'cok', 'cuk', 'dancok', 'gathel', 'pekok', 'asu', 'kirik', 'mbokmu', 'su',
    // Sunda
    'anjir', 'anying', 'goblog', 'belegug', 'sia', 'sia mah', 'aing', 'bagong', 'kehed', 'modar', 'borokokok'
];

const ALL_BAD_WORDS = [...new Set([...BAD_WORDS_ID, ...BAD_WORDS_EN, ...BAD_WORDS_REGION])];

/**
 * Fungsi filter utama
 * Mengganti kata kasar dengan karakter bintang (*)
 */
export function filterProfanity(text: string): string {
    if (!text) return '';
    
    let filteredText = text;
    
    // Urutkan kata berdasarkan panjangnya (terpanjang dulu) agar tidak salah potong
    const sortedWords = [...ALL_BAD_WORDS].sort((a, b) => b.length - a.length);
    
    for (const word of sortedWords) {
        // Gunakan regex case-insensitive dan pastikan kata berdiri sendiri (word boundary)
        // Note: Untuk bahasa Indonesia, terkadang orang menyingkat atau menyatukan kata, 
        // tapi word boundary adalah pendekatan paling aman agar tidak menyensor kata normal seperti "anjing" dalam "pancing"
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        filteredText = filteredText.replace(regex, (match) => '*'.repeat(match.length));
        
        // Cek juga variasi penulisan (misal: a-n-j-i-n-g)
        const spacedRegex = new RegExp(word.split('').join('[-_\\s.]+'), 'gi');
        if (word.length > 3) { // Hanya untuk kata yang cukup panjang agar tidak false positive
            filteredText = filteredText.replace(spacedRegex, (match) => '*'.repeat(match.length));
        }
    }
    
    return filteredText;
}

/**
 * Mengecek apakah teks mengandung kata kasar tanpa menyensornya
 */
export function hasProfanity(text: string): boolean {
    const normalized = text.toLowerCase().replace(/[^a-z\s]/g, '');
    return ALL_BAD_WORDS.some(word => normalized.includes(word));
}

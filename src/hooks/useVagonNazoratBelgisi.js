export function vagonNazoratBelgisi(vagonRaqami) {
  const raqamlar = vagonRaqami.toString().split("").map(Number);
  const koeffitsientlar = [2, 1, 2, 1, 2, 1, 2];
  let umumiyYigindi = 0;

  for (let i = 0; i < raqamlar.length; i++) {
    let kopaytma = raqamlar[i] * koeffitsientlar[i];
    // Agar ko'paytma ikki xonali bo'lsa, uning raqamlarini qo'shamiz
    if (kopaytma >= 10) {
      kopaytma = Math.floor(kopaytma / 10) + (kopaytma % 10);
    }
    umumiyYigindi += kopaytma;
  }

  const nazoratBelgisi = (10 - (umumiyYigindi % 10)) % 10;
  return nazoratBelgisi;
}

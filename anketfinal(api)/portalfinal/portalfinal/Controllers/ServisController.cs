using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using portalfinal.Models;
using portalfinal.ViewModel;

namespace portalfinal.Controllers
{
    public class ServisController : ApiController
    {
        DB03Entities db = new DB03Entities();
        SonucModel sonuc = new SonucModel();


        [HttpGet]
        [Route("api/kategoriliste")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                kategoriId = x.kategoriId,
                kategoriKodu = x.kategoriKodu,
                kategoriAdi = x.kategoriAdi,
                kategoriNo = x.kategoriNo,
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/kategoribyid/{kategoriId}")]
        public KategoriModel KategoriById(string kategoriId)
        {
            KategoriModel kayit = db.Kategori.Where(s => s.kategoriId == kategoriId).Select(x => new KategoriModel()
            {
                kategoriId = x.kategoriId,
                kategoriKodu = x.kategoriKodu,
                kategoriAdi = x.kategoriAdi,
                kategoriNo = x.kategoriNo,
                

            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel DersEkle(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.kategoriKodu == model.kategoriKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Kayıtlıdır!";
                return sonuc;
            }
            Kategori yeni = new Kategori();
            yeni.kategoriId = Guid.NewGuid().ToString();
            yeni.kategoriKodu = model.kategoriKodu;
            yeni.kategoriAdi = model.kategoriAdi;
            yeni.kategoriNo = model.kategoriNo;
            db.Kategori.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel DersDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.kategoriId == model.kategoriId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.kategoriKodu = model.kategoriKodu;
            kayit.kategoriAdi = model.kategoriAdi;
            kayit.kategoriNo = model.kategoriNo;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil")]
        public SonucModel KategoriSil(string kategoriId)
        {
            Kategori kayit = db.Kategori.Where(s => s.kategoriId == kategoriId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            db.Kategori.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }

        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeNo = x.uyeNo,
                uyeAdSoyad = x.uyeAdSoyad,
                
                
                
            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById(string uyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.uyeId == uyeId).Select(x => new UyeModel()
            {
                uyeId = x.uyeId,
                uyeNo = x.uyeNo,
                uyeAdSoyad = x.uyeAdSoyad,
               
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(s => s.uyeNo == model.uyeNo) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Üye Kayıtlıdır!";
                return sonuc;
            }
            Uye yeni = new Uye();
            yeni.uyeId = Guid.NewGuid().ToString();
            yeni.uyeNo = model.uyeNo;
            yeni.uyeAdSoyad = model.uyeAdSoyad;
           
            db.Uye.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == model.uyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.uyeNo = model.uyeNo;
            kayit.uyeAdSoyad = model.uyeAdSoyad;
           
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(string uyeId)
        {
            Uye kayit = db.Uye.Where(s => s.uyeId == uyeId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            if (db.Kayit.Count(s => s.kayitUyeId == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Üzerinde Anket Kaydı Olduğu İçin Üye Silinemez!";
                return sonuc;
            }
            db.Uye.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }

        [HttpPost]
        [Route("api/anketekle")]
        public SonucModel AnketEkle(AnketModel model)
        {
            if (db.Anket.Count(x => x.anketAdi == model.anketAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Anket Kayıtlıdır!";
                return sonuc;
            }

            Anket yeni = new Anket();
            yeni.anketId = Guid.NewGuid().ToString();
            yeni.anketAdi = model.anketAdi;
            yeni.anketKategoriId = model.anketKategoriId;


            db.Anket.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Eklendi";
            return sonuc;
        }

        [HttpGet]
        [Route("api/anketbyid/{anketId}")]
        public AnketModel AnketById(string anketId)
        {
            AnketModel kayit = db.Anket.Where(s => s.anketId == anketId).Select(x => new AnketModel()
            {
                anketAdi = x.anketAdi,
                anketKategoriId = x.anketKategoriId,
                anketId = x.anketId,              
            }).SingleOrDefault();
            return kayit;
        }

        [HttpGet]
        [Route("api/anketliste")]
        public List<AnketModel> AnketListe()
        {
            List<AnketModel> liste = db.Anket.Select(x => new AnketModel()
            {
                anketAdi = x.anketAdi,
                anketId = x.anketId,
                anketKategoriId = x.anketKategoriId,
                

            }).ToList();
            return liste;
        }

        [HttpDelete]
        [Route("api/anketsil/{anketId}")]
        public SonucModel AnketSil(string anketId)
        {
            Anket kayit = db.Anket.Where(s => s.anketId == anketId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Anket Bulunamadı!";
                return sonuc;
            }
            db.Anket.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Silindi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/anketduzenle")]
        public SonucModel AnketDuzenle(AnketModel model)
        {
            Anket kayit = db.Anket.Where(s => s.anketId == model.anketId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Anket Bulunamadı!";
                return sonuc;
            }
            kayit.anketAdi = model.anketAdi;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Düzenlendi";
            return sonuc;
        }

        [HttpGet]
        [Route("api/uyeanketliste/{uyeId}")]
        public List<KayitModel> UyeAnketListe(string uyeId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitUyeId == uyeId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitAnketId = x.kayitAnketId,
                kayitUyeId = x.kayitUyeId,
                kayitKategoriId = x.kayitKategoriId,
            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.uyeBilgi = UyeById(kayit.kayitUyeId);
                kayit.anketBilgi = AnketById(kayit.kayitAnketId);
                kayit.kategoriBilgi = KategoriById(kayit.kayitKategoriId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/anketuyeliste/{anketId}")]
        public List<KayitModel> AnketUyeListe(string anketId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitAnketId == anketId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitAnketId = x.kayitAnketId,
                kayitUyeId = x.kayitUyeId,
                kayitKategoriId = x.kayitKategoriId,

            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.uyeBilgi = UyeById(kayit.kayitUyeId);
                kayit.anketBilgi = AnketById(kayit.kayitAnketId);
                kayit.kategoriBilgi = KategoriById(kayit.kayitKategoriId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/kategorianketliste/{kategoriId}")]
        public List<KayitModel> KategoriAnketListe(string kategoriId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitKategoriId == kategoriId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitKategoriId = x.kayitKategoriId,
                kayitAnketId = x.kayitAnketId,

            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.kategoriBilgi = KategoriById(kayit.kayitKategoriId);
                kayit.anketBilgi = AnketById(kayit.kayitAnketId);
            }
            return liste;
        }

        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel KayitEkle(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitAnketId == model.kayitAnketId && s.kayitUyeId == model.kayitUyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Anket Önceden Kayıtlıdır!";
                return sonuc;
            }
            Kayit yeni = new Kayit();

            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitUyeId = model.kayitUyeId;
            yeni.kayitAnketId = model.kayitAnketId;
            yeni.kayitKategoriId = model.kayitKategoriId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Kaydı Eklendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]
        public SonucModel KayitSil(string kayitId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Anket Bulunamadı!";
                return sonuc;
            }
            db.Kayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Anket Silindi";
            return sonuc;
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace portalfinal.ViewModel
{
    public class KayitModel
    {
        internal UyeModel uyeBilgi;
        internal AnketModel anketBilgi;
        internal KategoriModel kategoriBilgi;

        public string kayitId { get; set; }
        public string kayitAnketId { get; set; }
        public string kayitUyeId { get; set; }
        public string kayitKategoriId { get; set; }
    }
}
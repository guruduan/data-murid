let dataAlumni = [];
let hasilTerakhir = [];

async function loadData() {

    const response = await fetch("alumni.json");
    dataAlumni = await response.json();

    isiFilter();
}

loadData();


function isiFilter(){

    const sekolahSet = new Set();
    const kelasSet = new Set();
    const mapelSet = new Set();
    const tahunSet = new Set();

    dataAlumni.forEach(a=>{
        sekolahSet.add(a.sekolah);
        kelasSet.add(a.kelas);
        mapelSet.add(a.mapel);
        tahunSet.add(a.tahun);
    });

    isiSelect("sekolah", sekolahSet);
    isiSelect("kelas", kelasSet);
    isiSelect("mapel", mapelSet);
    isiSelect("tahun", tahunSet);
}


function isiSelect(id, dataSet){

    const select = document.getElementById(id);

    dataSet.forEach(v=>{
        const option = document.createElement("option");
        option.value = v;
        option.text = v;
        select.appendChild(option);
    });

}


function cari(){

    const nama = document.getElementById("nama").value.toLowerCase();
    const sekolah = document.getElementById("sekolah").value;
    const kelas = document.getElementById("kelas").value;
    const mapel = document.getElementById("mapel").value;
    const tahun = document.getElementById("tahun").value;

    const hasil = dataAlumni.filter(a => {

        return (
            (nama === "" || a.nama.toLowerCase().includes(nama)) &&
            (sekolah === "" || a.sekolah === sekolah) &&
            (kelas === "" || a.kelas === kelas) &&
            (mapel === "" || a.mapel === mapel) &&
            (tahun === "" || a.tahun === tahun)
        );

    });

    hasilTerakhir = hasil;

    tampilkan(hasil);
}


function tampilkan(hasil){

    let html="";

    if(hasil.length===0){

        html="<p>Data tidak ditemukan</p>";

    }else{

        hasil.forEach(a=>{

html+=`
<div class="card">
<b>${a.nama}</b><br>
Sekolah : ${a.sekolah}<br>
Kelas : ${a.kelas}<br>
Ngajar Mapel : ${a.mapel}<br>
Di Tahun Ajaran : ${a.tahun_ajaran}<br>
Alumni Tahun : ${a.tahun}<br><br>

<button onclick="lihatTeman('${a.sekolah}','${a.kelas}','${a.mapel}','${a.tahun}')">
👥 Lihat Teman Sekelas
</button>

</div>
`;

        });

    }

    document.getElementById("result").innerHTML = html;

}


function lihatTeman(sekolah,kelas,mapel,tahun){

const teman = dataAlumni.filter(a =>
a.sekolah === sekolah &&
a.kelas === kelas &&
a.mapel === mapel &&
a.tahun === tahun
)

let html = `
<h3>Teman Sekelas</h3>
<button onclick="kembali()">⬅ Kembali</button>
<br><br>
`;

teman.forEach(a=>{
html+=`
<div class="card">
<b>${a.nama}</b><br>
Sekolah : ${a.sekolah}<br>
Kelas : ${a.kelas}<br>
Ngajar Mapel : ${a.mapel}<br>
Di Tahun Ajaran : ${a.tahun_ajaran}<br>
Alumni Tahun : ${a.tahun}
</div>
`
})

document.getElementById("result").innerHTML = html;

}


function kembali(){

tampilkan(hasilTerakhir)

}

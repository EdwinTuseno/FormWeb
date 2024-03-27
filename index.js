document.getElementById("simpan").addEventListener(
  "click",
  function () {
    let nama = document.getElementById("nama").value;
    let npm = document.getElementById("npm").value;
    let mhs = { nama: nama, npm: npm };
    let listmhs = [];
    if (localStorage.getItem("mhs")) {
      listmhs = JSON.parse(localStorage.getItem("mhs"));
      listmhs.push(mhs);
    } else {
      listmhs.push(mhs);
    }
    localStorage.setItem("mhs", JSON.stringify(listmhs));
    let data = "";
    for (const [idx, dt] of listmhs.entries()) {
      data +=
        "<tr>" +
        "<td>" + (idx + 1) + "</td>" +
        "<td>" + dt.npm + "</td>" +
        "<td>" + dt.nama + "</td>" +
        "<td><button class='btn btn-danger btn-delete' data-index='" + idx + "'>Hapus</button></td>" +
        "</tr>";
    }
    document.getElementById("data").innerHTML = data;

    // Tambahkan event listener untuk setiap tombol hapus yang dibuat
    let deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        let index = this.getAttribute('data-index');
        listmhs.splice(index, 1);
        localStorage.setItem('mhs', JSON.stringify(listmhs));
        let newData = "";
        for (const [idx, dt] of listmhs.entries()) {
          newData +=
            "<tr>" +
            "<td>" + (idx + 1) + "</td>" +
            "<td>" + dt.npm + "</td>" +
            "<td>" + dt.nama + "</td>" +
            "<td><button class='btn btn-danger btn-delete' data-index='" + idx + "'>Hapus</button></td>" +
            "</tr>";
        }
        document.getElementById("data").innerHTML = newData;
        // Setel ulang event listener setelah penghapusan
        resetDeleteButtonListener();
      });
    });
  },
  true
);

// Function untuk menetapkan kembali event listener tombol hapus
function resetDeleteButtonListener() {
  let deleteButtons = document.querySelectorAll('.btn-delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      let index = this.getAttribute('data-index');
      listmhs.splice(index, 1);
      localStorage.setItem('mhs', JSON.stringify(listmhs));
      let newData = "";
      for (const [idx, dt] of listmhs.entries()) {
        newData +=
          "<tr>" +
          "<td>" + (idx + 1) + "</td>" +
          "<td>" + dt.npm + "</td>" +
          "<td>" + dt.nama + "</td>" +
          "<td><button class='btn btn-danger btn-delete' data-index='" + idx + "'>Hapus</button></td>" +
          "</tr>";
      }
      document.getElementById("data").innerHTML = newData;
      // Setel ulang event listener setelah penghapusan
      resetDeleteButtonListener();
    });
  });
}

// Tambahkan event listener untuk tombol hapus semua
document.getElementById("hapus").addEventListener("click", function () {
  localStorage.removeItem("mhs");
  document.getElementById("data").innerHTML = "";
});

console.log("connected");
let histories = []
function defineCategory(name, age, gender, weight, height) {
  let category = "";
  let bmi = (weight / (height * height * 0.0001)).toFixed(1);


  let grafikBoy = [
    [2, 21.2, 18.2, 14.7],
    [3, 18.2, 17.5, 14.4],
    [4, 17.8, 16.9, 14],
    [5, 17.9, 16.8, 13.8],
    [6, 18.5, 17, 13.6],
    [7, 19, 17.2, 13.6],
    [8, 20, 18, 13.8],
    [9, 21, 18.6, 13.9],
    [10, 22, 21.5, 14.2],
    [11, 23.2, 20.2, 14.5],
    [12, 24.2, 23, 15],
    [13, 25.2, 21.8, 15.5],
    [14, 26, 22.5, 16],
    [15, 26.8, 23.5, 16.5],
    [16, 27.5, 24.2, 17],
    [17, 28.5, 25, 17.5],
    [18, 29, 25.5, 18.2],
    [19, 29.5, 26.3, 18.6],
    [20, 30.5, 27, 19],
  ];
  let grafikGirl = [
    [2, 19.5, 18, 14.2],
    [3, 18.8, 17.2, 13.8],
    [4, 18.8, 16.8, 13.5],
    [5, 19, 16.8, 13.4],
    [6, 19.6, 17.2, 13.2],
    [7, 20.6, 17.6, 13.2],
    [8, 21.8, 18.2, 13.4],
    [9, 23.2, 19, 13.5],
    [10, 24.5, 20, 13.6],
    [11, 25.8, 20.8, 14],
    [12, 27, 21.6, 14.5],
    [13, 28.2, 22.5, 15],
    [14, 29.4, 23.4, 15.4],
    [15, 30.4, 24, 16],
    [16, 31.2, 24.6, 16.4],
    [17, 32.2, 25.2, 16.8],
    [18, 33, 5.2, 17.2, 17.2],
    [19, 34, 26.5, 17.5],
    [20, 35, 26.5, 17.4],
  ];

  if (age < 2 || age > 120) {
    return "Silahkan isi dengan age antara 2 dan 120 tahun";
  }
  if (gender === "") {
    return "Silahkan isi gender anda";
  }
  if (weight === "") {
    return "Silahkan isi berat badan anda";
  }
  if (height === "") {
    return "Silahkan isi tinggi badan anda";
  }

  if (age > 20) {
    if (bmi > 40) {
      category = "Obese Class III";
    } else if (bmi >= 35) {
      category = "Obese Class II";
    } else if (bmi >= 30) {
      category = "Obese Class I";
    } else if (bmi >= 25) {
      category = "Overweight";
    } else if (bmi >= 18.5) {
      category = "Normal";
    } else if (bmi >= 17) {
      category = "Mild Thinness";
    } else if (bmi >= 16) {
      category = "Moderate Thinness";
    } else {
      category = "Severe Thinness";
    }
  } else {
      if (gender === "boy") {
          for (let i of grafikBoy) {
        if (age === i[0]) {
          if (bmi > i[1]) {
            category = "Overweight";
          } else if (bmi >= i[2]) {
            category = "At risk of overweight";
          } else if (bmi >= i[3]) {
            category = "Healthy weight";
          } else if (bmi < i[3]) {
            category = "Underweight";
          }
        }
      }
    } else if (gender === "girl") {
      for (let j of grafikGirl) {
        if (age === j[0]) {
          if (bmi > j[1]) {
            category = "Overweight";
          } else if (bmi >= j[2]) {
            category = "At risk of overweight";
          } else if (bmi >= j[3]) {
            category = "Healthy weight";
          } else if (bmi < j[3]) {
            category = "Underweight";
          }
        }
      }
    }
  }
  
  let result = {
    Nama: name,
    Umur: age,
    "Berat badan": weight,
    "Tinggi badan": height,
    "Index Berat Badan": Number(bmi),
    Kategori: category,
  };
  return result;
}

document.getElementById("calculate").addEventListener ("click", function () {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const isFemale = document.getElementById("f").checked;
    const isMale = document.getElementById("m").checked;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const gender = isFemale 
    ? "girl" 
    : isMale
    ? "boy"
    : ""
    
    const result = defineCategory(name, Number(age), gender, Number(weight), Number(height))
    if (typeof result === "string") {
      document.getElementById("hasil-akhir").innerText = result
    } else {
      document.getElementById("hasil-akhir").innerText = `Your BMI calculate: ${result["Index Berat Badan"]} and your category: ${result.Kategori}`
      histories.push(result)
      
      let temp = ""
      
      for (let i = 0; i < histories.length; i++) {
        temp += `
          <tr>
            <td>${histories[i].Nama}</td>
            <td>${histories[i].Umur}</td>
            <td>${histories[i]["Berat badan"]}</td>
            <td>${histories[i]["Tinggi badan"]}</td>
            <td>${histories[i]["Index Berat Badan"]}</td>
            <td>${histories[i].Kategori}</td>
          </tr>
        `
      }
      document.getElementById("table-body").innerHTML = temp
    }
  })
  document.getElementById("reset").addEventListener("click", function () {
    document.getElementById("table-body").innerHTML = ""
    histories = []
    temp = ""
  })

import shellHelix from "../assets/images/products/shell-helix-hx8.jpg";
import mobil1 from "../assets/images/products/mobil-1-fs.jpg";
import castrolEdge from "../assets/images/products/castrol-edge.jpg";
import motul8100 from "../assets/images/products/motul-8100.jpg";

const products = [
  {
    id: 1,
    name: "Shell Helix HX8",
    brand: "Shell",
    oilType: "Fully Synthetic Engine Oil",
    compatibility: ["Toyota", "Honda", "Nissan"],
    price: 4500,
    stock: 12,
    image: shellHelix,
  },
  {
    id: 2,
    name: "Mobil 1 FS",
    brand: "Mobil",
    oilType: "Fully Synthetic Engine Oil",
    compatibility: ["Toyota", "BMW", "Mercedes-Benz"],
    price: 5200,
    stock: 8,
    image: mobil1,
  },
  {
    id: 3,
    name: "Castrol EDGE",
    brand: "Castrol",
    oilType: "Advanced Full Synthetic Oil",
    compatibility: ["Honda", "Toyota", "Ford"],
    price: 4800,
    stock: 15,
    image: castrolEdge,
  },
  {
    id: 4,
    name: "Motul 8100 X-CESS",
    brand: "Motul",
    oilType: "Synthetic Engine Oil",
    compatibility: ["BMW", "Mercedes-Benz", "Audi"],
    price: 5600,
    stock: 6,
    image: motul8100,
  },
];

export default products;

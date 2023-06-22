const prompt=require('prompt-sync')()

class Rasgulla {
    constructor(radius, height) {
      this.radius = radius;
      this.height = height;
    }
  
    calculateSurfaceArea() {
      const baseArea = Math.PI * this.radius ** 2;
      const lateralArea = 2 * Math.PI * this.radius * this.height;
      const surfaceArea = 2 * baseArea + lateralArea;
      return surfaceArea;
    }
  }
  
  class RasgullaCalculator {
    constructor() {
      this.rasgullas = [];
    }
  
    addRasgulla(radius, height) {
      const rasgulla = new Rasgulla(radius, height);
      this.rasgullas.push(rasgulla);
    }
  
    calculateTotalSurfaceArea() {
      let totalSurfaceArea = 0;
      for (const rasgulla of this.rasgullas) {
        totalSurfaceArea += rasgulla.calculateSurfaceArea();
      }
      return totalSurfaceArea;
    }
  }
  
  function main() {
    const rasgullaCalculator = new RasgullaCalculator();
  
    const n = parseInt(prompt("Enter the number of Rasgullas: "));
    for (let i = 1; i <= n; i++) {
      const radius = parseFloat(prompt(`Enter the radius of Rasgulla ${i}: `));
      const height = parseFloat(prompt(`Enter the height of Rasgulla ${i}: `));
      rasgullaCalculator.addRasgulla(radius, height);
    }
  
    const totalSurfaceArea = rasgullaCalculator.calculateTotalSurfaceArea();
  
    console.log("Total surface area of the Rasgullas:", totalSurfaceArea);
  }
  
  main();
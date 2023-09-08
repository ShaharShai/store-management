import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Home() {
  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);
  const purchases = useSelector((state) => state.purchases);

  const [dates, setDates] = useState([]);

  const [purchaseData, setPurchaseData] = useState({
    labels: dates,
    datasets: [
      {
        label: "Purchases",
        data: purchases.map((purchase) => purchase.productId)
      },
    ],
  });

  useEffect(() => {
    let purchasesDates = purchases.map(purchase => purchase.date);
    let datesArr = [];
  
    purchasesDates.forEach(date => {
      if (!datesArr.includes(date)) {
        datesArr.push(date);
      }
    });
  
    setDates(datesArr);
  }, [purchases]);
  
  useEffect(() => {
    const purchaseCounts = dates.map(date => {
      return purchases.filter(purchase => purchase.date === date).length;
    });
  
    setPurchaseData({
      labels: dates,
      datasets: [
        {
          label: "Purchases",
          data: purchaseCounts
        },
      ],
    });
  }, [dates]);

  return (
    <>

      <h1 className="text-3xl text-center">Home</h1>
    <div className="parent-container">
      <div  style={{width: 850}}>
        <Bar data={purchaseData} />
      </div>
      </div>
    </>
  );
}

export default Home;

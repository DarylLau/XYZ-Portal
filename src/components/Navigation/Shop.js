import React, { useState, useEffect } from "react";

function Shop() {
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      // const data = await fetch(
      //   "https://fortniteapi.io/challenges?season=current&lang=en",
      //   {
      //     headers: {
      //       Authorization: "2b784b55-42ac4e1c-380055fb-41bd57b6",
      //     },
      //   }
      // );
      const data = await fetch(`./express_backend`);

      const items = await data.json();

      console.log(items);
    } catch (e) {
      console.log("error");
    }
  };
  //2b784b55-42ac4e1c-380055fb-41bd57b6
  return (
    <div>
      <h1>Shop Page</h1>
    </div>
  );
}

export default Shop;

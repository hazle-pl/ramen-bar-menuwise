import CustomInput from "@/atoms/customInput";
import CustomTextArea from "@/atoms/customTextArea";
import React, { useEffect, useState } from "react";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  promotionPrice?: number;
  allergens?: string[];
  image?: string;
  category?: string;
  hidden?: boolean;
  recommended?: boolean;
}

const PlaceOrder: React.FC<{ restaurantId: any; tableNumber?: number | null }> = ({
  restaurantId,
  tableNumber,
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<{ [key: string]: number }>({});
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState({
    city: "",
    street: "",
    buildingNumber: "",
    apartmentNumber: "",
    phoneNumber: "",
  });

  const MenuwiseURL = process.env.NEXT_PUBLIC_MENUWISE_URL;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${MenuwiseURL}/api/menu/getMenu?restaurantId=${restaurantId}`);
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Błąd pobierania menu:", error);
      }
    };
    if (restaurantId) fetchMenu();
  }, [restaurantId]);

  const recommendedItems = menuItems.filter(item => item.recommended && !item.hidden);

  const groupedItems = menuItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (item.hidden) return acc;
    const category = item.category || "Inne";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(groupedItems);

  const handleOrder = async () => {
    if (
      tableNumber == null &&
      (!deliveryDetails.city ||
        !deliveryDetails.street ||
        !deliveryDetails.buildingNumber ||
        !deliveryDetails.phoneNumber)
    ) {
      alert("Proszę uzupełnić wszystkie wymagane pola adresowe.");
      return;
    }

    const order = {
      restaurantId,
      tableNumber: tableNumber ?? null,
      deliveryDetails: tableNumber == null ? deliveryDetails : null,
      items: Object.entries(orderItems)
        .filter(([, quantity]) => quantity > 0)
        .map(([menuItemId, quantity]) => ({
          menuItemId,
          quantity,
        })),
      note,
      email,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${MenuwiseURL}/api/orders/placeOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        alert("Zamówienie złożone!");
        setOrderItems({});
        setNote("");
        setEmail("");
        setDeliveryDetails({
          city: "",
          street: "",
          buildingNumber: "",
          apartmentNumber: "",
          phoneNumber: "",
        });
      } else {
        const err = await res.json();
        alert(`Błąd: ${err.message}`);
      }
    } catch (err) {
      console.error("Błąd składania zamówienia:", err);
    }
  };

  const totalCost = Object.entries(orderItems).reduce((sum, [id, qty]) => {
    const item = menuItems.find((i) => i._id === id);
    return sum + (item ? (item.promotionPrice ?? item.price) * qty : 0);
  }, 0);

  const renderMenuItem = (item: MenuItem) => (
    <li className="box" key={item._id} style={{ position: "relative" }}>
      <div className="badges">
        {item.promotionPrice && (
         
            <i className="fa-solid fa-percent"></i>
        )}
        {item.recommended && (
      <i className="fa-solid fa-star"></i>
        )}
        {item.allergens?.length ? (
          <i className="fa-solid fa-wheat-awn-circle-exclamation"></i>
        ) : null}
      </div>

      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          width={150}
          height={100}
          style={{ objectFit: "cover" }}
        />
      )}

      <div className="content-section">
        <strong>{item.name}</strong>
        <p className="price">
          Cena:{" "}
          {item.promotionPrice ? (
            <>
              <span style={{ textDecoration: "line-through" }}>{item.price} zł</span>{" "}
              {item.promotionPrice} zł
            </>
          ) : (
            `${item.price} zł`
          )}
        </p>

        {item.allergens?.length ? (
          <div>Alergeny: {item.allergens.join(", ")}</div>
        ) : null}
      </div>

      <CustomInput
        type="number"
        value={orderItems[item._id] ?? 0}
        onChange={(val) =>
          setOrderItems({ ...orderItems, [item._id]: Number(val) || 0 })
        }
        placeholder="Ilość"
      />
    </li>
  );

  return (
    <div className="place-order">
      <h2>Składanie zamówienia</h2>

      <label>
        Kod lojalnościowy:
        <CustomInput
          value={email}
          onChange={setEmail}
          placeholder="Wpisz kod lojalnościowy"
          type="text"
        />
      </label>

      {tableNumber == null ? (
        <div>
          <h3>Zamówienie online - Adres</h3>
          {Object.entries(deliveryDetails).map(([key, val]) => (
            <label key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <CustomInput
                value={val}
                onChange={(v) => setDeliveryDetails({ ...deliveryDetails, [key]: v })}
                placeholder={`Wpisz ${key}`}
                type="text"
              />
            </label>
          ))}
        </div>
      ) : (
        <p>Numer stolika: {tableNumber}</p>
      )}

      {recommendedItems.length > 0 && (
        <section className="category-section">
          <h3>Polecane</h3>
          <ul className="grid xl-4 md-2 xs-1">
            {recommendedItems.map(renderMenuItem)}
          </ul>
        </section>
      )}

      {categories.map((cat) => (
        <section key={cat} className="category-section">
          <h3>{cat}</h3>
          <ul className="grid xl-4 md-2 xs-1">
            {groupedItems[cat].map(renderMenuItem)}
          </ul>
        </section>
      ))}

      <div>
        <h3>Notatka do zamówienia:</h3>
        <CustomTextArea
          value={note}
          onChange={setNote}
          placeholder="Np. bez cebuli, poziom wysmażenia..."
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Łącznie: {totalCost} zł</strong>
      </div>

      <button onClick={handleOrder} style={{ marginTop: 12, padding: "8px 16px" }}>
        Złóż zamówienie
      </button>
    </div>
  );
};

export default PlaceOrder;

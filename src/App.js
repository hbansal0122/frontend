import { useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const [containerType, setContainerType] = useState("absetzcontainer");
  const [isLid, setIsLid] = useState("yes");
  const [containerSize, setContainerSize] = useState("5");
  const [bigBagSize, setBigBagSize] = useState(".5");
  const [selectedDate, setSelectedDate] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const formData = () => {
    return {
      "containerType": containerType,
      "isLid": isLid,
      "containerSize": containerSize,
      "bigBagSize": bigBagSize,
      "selectedDate": selectedDate,
      "shippingAddress": shippingAddress,
      "billingAddress": billingAddress
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8000/containers/",
      data: formData(),
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        alert("Thank you for dealing with us")
      })
      .catch(function (err) {
        alert("Backend has some problems")
        console.error(err);
      });

  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Container Type</label>
      <select value={containerType} onChange={(e) => { setContainerType(e.target.value) }}>
        <option value="absetzcontainer">Absetzcontainer</option>
        <option value="abrollcontainer">Abrollcontainer</option>
      </select>
      <label>Do you want a lid for the container:</label>
      <select value={isLid} onChange={(e) => { setIsLid(e.target.value) }}>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      <label>Container Size</label>
      <select value={containerSize} onChange={(e) => { setContainerSize(e.target.value) }}>
        <option value="5">5 Cubic meter</option>
        <option value="7">7 Cubic meter</option>
        <option value="12">12 Cubic meter</option>
      </select>
      <label>Big Bag Size</label>
      <select value={bigBagSize} onChange={(e) => { setBigBagSize(e.target.value) }}>
        <option value=".5">.5 Cubic meter</option>
        <option value="1">1 Cubic meter</option>
      </select>
      <label>Desired date of placement</label>
      <input type="date"
        defaultValue={selectedDate}
        onChange={(e) => { setSelectedDate(e.target.value) }} />
      <input type="text"
        value={shippingAddress}
        placeholder="Address for Shipping"
        onChange={(e) => { setShippingAddress(e.target.value) }} />
      <input type="text"
        value={billingAddress}
        placeholder="Address for Billing"
        onChange={(e) => { setBillingAddress(e.target.value) }} />
      <button type="submit">Save the container</button>
    </form>
  );
}

// TODO: implement toggle for shipping and billing in case they are same
// TODO: validations for fields
// TODO: create get request to show data
// TODO: create constants file

export default App;

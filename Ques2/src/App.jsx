import { useState, useEffect } from "react";

function App() {
  const [companyname, setCompanyname] = useState("AMZ");
  const [categoryname, setCategoryname] = useState("Laptop");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [companyname, categoryname, page]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${page}&minPrice=1&maxPrice=10000`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzc5NTcwLCJpYXQiOjE3MjA3NzkyNzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU5MzY3OTFiLTE4MjQtNDgxNy05YjRiLWRmNDhiMDgwOTMyMCIsInN1YiI6ImlzaGl0YS50cmlwYXRoaV9jczIxQGdsYS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6IkdMQSBVbml2ZXJzaXR5IiwiY2xpZW50SUQiOiI1OTM2NzkxYi0xODI0LTQ4MTctOWI0Yi1kZjQ4YjA4MDkzMjAiLCJjbGllbnRTZWNyZXQiOiJ3dEluaEZwZlBLdnFTUHRWIiwib3duZXJOYW1lIjoiSXNoaXRhIFRyaXBhdGhpIiwib3duZXJFbWFpbCI6ImlzaGl0YS50cmlwYXRoaV9jczIxQGdsYS5hYy5pbiIsInJvbGxObyI6IjIxMTUwMDA0ODEifQ.Y-M-gWYHVNL-2uIDejVZvHA_NYWgQk9Nj3riUbBQHTI",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleCompanyChange = (event) => {
    setCompanyname(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = (event) => {
    setCategoryname(event.target.value);
    setPage(10);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 10);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 10);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold mb-4">Product List</h1>

      <div className="mb-4 flex space-x-4">
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Company:
          </label>
          <select
            id="company"
            name="company"
            className="block w-36 px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            value={companyname}
            onChange={handleCompanyChange}
          >
            <option value="AMZ">AMZ</option>
            <option value="FLP">FLP</option>
            <option value="SNP">SNP</option>
            <option value="MYN">MYN</option>
            <option value="AZO">AZO</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Category:
          </label>
          <select
            id="category"
            name="category"
            className="block w-36 px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            value={categoryname}
            onChange={handleCategoryChange}
          >
            <option value="Phone">Phone</option>
            <option value="Computer">Computer</option>
            <option value="TV">TV</option>
            <option value="Earphone">Earphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Charger">Charger</option>
            <option value="Mouse">Mouse</option>
            <option value="Keypad">Keypad</option>
            <option value="Bluetooth">Bluetooth</option>
            <option value="Pendrive">Pendrive</option>
            <option value="Remote">Remote</option>
            <option value="Speaker">Speaker</option>
            <option value="Headset">Headset</option>
            <option value="Laptop">Laptop</option>
            <option value="PC">PC</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold">{product.productName}</h2>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-gray-600">Discount: {product.discount}%</p>
              <p className="text-gray-600">Rating: {product.rating}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">
                Availability: {product.availability}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white ml-4"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;
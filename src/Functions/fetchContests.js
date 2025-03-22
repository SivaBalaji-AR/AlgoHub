const fetchContests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/upcoming-contests");
      if (!response.ok) throw new Error("Failed to fetch contests");
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching contests:", error);
      return [];
    }
  };
  
  export default fetchContests;
  
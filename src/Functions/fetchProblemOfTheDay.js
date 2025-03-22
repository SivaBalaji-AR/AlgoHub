const fetchProblemOfTheDay = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/leetcode-pod");
    if (!response.ok) throw new Error("Failed to fetch PoD");

    const data = await response.json();
    return { title: data.title, url: data.url };
  } catch (error) {
    console.error("Error fetching LeetCode Problem of the Day:", error);
    return null;
  }
};

export default fetchProblemOfTheDay;

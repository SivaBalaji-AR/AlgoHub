export default async function handler(req, res) {
    try {
      const query = `query upcomingContests {
        upcomingContests {
          title
          titleSlug
          startTime
        }
      }`;
  
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
  
      const data = await response.json();
      const contests = data.data.upcomingContests.map((contest) => ({
        name: contest.title,
        url: `https://leetcode.com/contest/${contest.titleSlug}`,
        startTime: contest.startTime * 1000, 
      }));
  
      res.status(200).json(contests);
    } catch (error) {
      console.error("Error fetching contests:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
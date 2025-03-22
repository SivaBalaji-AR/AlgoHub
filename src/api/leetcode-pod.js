export default async function handler(req, res) {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
  
      const query = `query dailyCodingQuestionRecords($year: Int!, $month: Int!) {
        dailyCodingChallengeV2(year: $year, month: $month) {
          challenges {
            date
            link
            question {
              questionFrontendId
              title
            }
          }
        }
      }`;
  
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { year, month } }),
      });
  
      const data = await response.json();
      const today = new Date().toISOString().split("T")[0];
  
      const problem = data.data.dailyCodingChallengeV2.challenges.find(
        (p) => p.date === today
      );
  
      if (problem) {
        res.status(200).json({ title: problem.question.title, url: `https://leetcode.com${problem.link}` });
      } else {
        res.status(404).json({ error: "Problem of the Day not found." });
      }
    } catch (error) {
      console.error("Error fetching LeetCode PoD:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
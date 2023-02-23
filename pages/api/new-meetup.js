// Server Side Code
// POST: /api/new-meetup

function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;

    // store in a database
  }
}

export default handler;

import sql from "../configs/db.js";

// getUserCreations
export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// getPublishCreations
export const getPublishCreations = async (req, res) => {
  try {
    const creations =
      await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// toggleLikeCreation
export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;
    if (!creation) {
      return res.json({ success: false, message: "Creation not found" });
    }

    let currentLikes = creation.likes || []; // fallback empty array
    const userIdStr = String(userId);
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      // Unlike
      updatedLikes = currentLikes.filter((u) => u !== userIdStr);
      message = "Creation Unliked";
    } else {
      // Like
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation Liked";
    }

    await sql`
      UPDATE creations 
      SET likes = ${sql.array(updatedLikes, "text")} 
      WHERE id = ${id}
    `;

    res.json({ success: true, message, likes: updatedLikes });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

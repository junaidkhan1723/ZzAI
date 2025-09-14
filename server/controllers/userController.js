import sql from "../configs/db.js";

// getUserCreations
export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY create_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// getPublishCreations
export const getPublishCreations = async (req, res) => {
  try {
    const creations =
      await sql`SELECT * FROM creations WHERE publish = true ORDER BY create_at DESC`;

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

    let currentLikes = creation.likes || []; 
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      // Unlike
      updatedLikes = currentLikes.filter((user) => user !== userIdStr);
      message = "Creation Unliked";
    } else {
      // Like
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation Liked";
    }

    const formattedArray = `{${updatedLikes.join(',')}}`
    await sql`UPDATE creations SET likes = ${formattedArray} ::text[] WHERE id = ${id}`;

    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// deleteCreation
export const deleteCreation = async (req, res) => {
  try {
    const { id } = req.params;

    const { userId } = req.auth();
    const userIdStr = userId?.toString();

    const idNum = Number(id);

    const result = await sql`
      DELETE FROM creations
      WHERE id = ${idNum} AND user_id = ${userIdStr}
      RETURNING *;
    `;

    if (!result || result.length === 0) {
      return res.status(404).json({ success: false, message: "Creation not found or not owned by you." });
    }

    return res.json({ success: true, message: "Creation deleted", deleted: result[0] });
  } catch (err) {
    console.error("deleteCreation error:", err);
    return res.status(500).json({ success: false, message: "Failed to delete creation" });
  }
};

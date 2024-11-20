import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, List, ListItem, ListItemText, Avatar } from "@mui/material";
import { useUserDetailsQuery } from "../../../redux/service";

const FollowersPage = () => {
  const { userId } = useParams(); // Get user ID from the route
  const { data, isLoading, isError } = useUserDetailsQuery(userId); // Fetch user details via Redux service
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (data && data.user && data.user.followers) {
      setFollowers(data.user.followers); // Set followers data if available
    }
  }, [data]);

  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h6">Loading followers...</Typography>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Failed to fetch followers. Please try again later.
        </Typography>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Typography variant="h4" gutterBottom style={styles.header}>
        Followers
      </Typography>
      {followers.length > 0 ? (
        <List style={styles.list}>
          {followers.map((follower) => (
            <ListItem key={follower._id} style={styles.listItem}>
              {/* User's Avatar */}
              <Avatar
                src={follower.profilePic} // Profile image from the API
                alt={follower.userName || "Unknown"}
                style={styles.avatar}
              />
              {/* User Details */}
              <ListItemText
                primary={
                  <Link
                    to={`/profile/threads/${follower._id}`} // Redirect to profile page
                    style={styles.link}
                    onMouseEnter={(e) =>
                      (e.target.style.color = "#0056b3") // Darker blue on hover
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.color = "#0a66c2") // Reset to original color
                    }
                  >
                    {follower.userName || "Unknown"}
                  </Link>
                }
                secondary={follower.email || "No Email"}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" style={styles.noFollowers}>
          No followers found.
        </Typography>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    // maxWidth: "600px",
    margin: "50px 80px", // Center align
    fontFamily: "Arial, sans-serif",
    border: "1px solid #e3e3e3",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  header: {
    color: "#1d4ed8",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  list: {
    padding: "0",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #f0f0f0",
    padding: "10px 0",
    transition: "background-color 0.2s ease",
  },
  avatar: {
    marginRight: "15px",
    width: "50px",
    height: "50px",
    border: "2px solid #ddd",
  },
  link: {
    textDecoration: "none",
    color: "#0a66c2",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "color 0.2s ease, transform 0.2s ease",
  },
  noFollowers: {
    textAlign: "center",
    color: "#555",
    fontStyle: "italic",
  },
};

export default FollowersPage;

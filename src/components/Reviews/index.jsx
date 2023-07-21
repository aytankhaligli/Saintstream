import styles from "./Reviews.module.css";
import Input from "../Input";
import Button from "../Button";
import sendIcon from "../../assets/icons/paper-plane-solid.svg";
import userImg from "../../assets/images/user.png";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
export default function Reviews({ movieId }) {
  const { userData, addReview, reviews } = useContext(LoginContext);
  const [reviewData, setReviewData] = useState({ name: "", email: "", id: "" });
  const [movieReviews, setMovieReviews] = useState(null);
  useEffect(() => {
    userData
      ? setReviewData({
          id: userData.id,
          name: userData.username,
          email: userData.email,
          imagePath: userData.imagePath,
        })
      : setReviewData({});
  }, [userData]);

  useEffect(() => {
    const movieRews =
      reviews.length &&
      reviews.filter((rew) => rew.movie_id === movieId)[0]?.user_reviews;
    setMovieReviews(movieRews);
  }, [movieId, reviews]);

  return (
    <div className={styles.container}>
      <h1>Kommentlər({movieReviews ? movieReviews.length : 0})</h1>
      <form className={styles.form}>
        <div className={styles.inputBox}>
          <Input
            placeholder="Ad"
            value={reviewData.name}
            readonly={userData.name ? true : false}
            onChange={(e) =>
              setReviewData((pre) => ({ ...pre, name: e.target.value }))
            }
            required
          />
          <Input
            placeholder="E-mail"
            value={reviewData.email}
            readonly={userData.email ? true : false}
            onChange={(e) =>
              setReviewData((pre) => ({ ...pre, email: e.target.value }))
            }
            required
          />
        </div>
        <textarea
          value={reviewData.text}
          placeholder="Film haqqında nə düşünürsən?"
          required
          className={styles.text}
          onChange={(e) =>
            setReviewData((pre) => ({ ...pre, text: e.target.value }))
          }
        ></textarea>
        <Button
          text="Komment göndər"
          style={{
            backgroundColor: "rgb(0, 146, 93)",
          }}
          icon={sendIcon}
          onClick={() => addReview(movieId, reviewData)}
        />
      </form>
      <div className={styles.reviews}>
        {movieReviews &&
          movieReviews.map((review, index) => (
            <div key={index} className={styles.reviewBox}>
              <div className={styles.image}>
                <img
                  src={review.imagePath ? review.imagePath : userImg}
                  alt=""
                />
              </div>
              <div>
                <p className={styles.userInfo}>{review.username}</p>
                <p className={styles.comment}> {review.review}</p>
              </div>
              <p className={styles.time}>
                {review.created_at.toDate().toLocaleString("az-Az", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

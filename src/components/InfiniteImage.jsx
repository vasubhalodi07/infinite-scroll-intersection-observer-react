import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOffset, fetchImage } from "../redux/imageSlice";

const InfiniteImage = () => {
  const dispatch = useDispatch();
  const { image, hasMore, offset } = useSelector((state) => state.imageKey);
  const [loading, setLoading] = useState(true);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    if (hasMore) {
      dispatch(fetchImage(offset));
    }
  }, [dispatch, offset, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScrollbar);
    return () => window.removeEventListener("scroll", handleInfiniteScrollbar);
  }, []);

  const handleInfiniteScrollbar = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        hasMore
      ) {
        console.log(offset);
        dispatch(changeOffset());
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="fetch-image" ref={imageContainerRef}>
        <div className="height">
          <div className="image-div">
            {image &&
              image.map((item, index) => {
                return (
                  <div key={index} className="image-details">
                    <div>{item.title ? item.title : "image"}</div>
                    <div className="image-con">
                      <img src={item.url} alt="image" />
                    </div>
                  </div>
                );
              })}
          </div>
          {loading && <div>Loading...</div>}
          {!hasMore && <div>All Record are Loaded</div>}
        </div>
      </div>
    </>
  );
};

export default InfiniteImage;

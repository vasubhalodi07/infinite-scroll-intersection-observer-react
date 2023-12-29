import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOffset, fetchImage } from "../redux/imageSlice";

const InfiniteImage = () => {
  const dispatch = useDispatch();
  const { image, hasMore, offset } = useSelector((state) => state.imageKey);
  const [loading, setLoading] = useState(true);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    console.log("only api called useEffect called");
    if (hasMore) {
      dispatch(fetchImage(offset));
    }
  }, [offset]);

  const handleInfiniteScrollbar = async () => {
    try {
      // console.log(
      //   "window Height: " +
      //     window.innerHeight +
      //     " scrollTop:" +
      //     document.documentElement.scrollTop +
      //     " scroll height: " +
      //     document.documentElement.scrollHeight
      // );
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        dispatch(changeOffset());
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkScrollbar = () => {
    const windowHeight = window.innerHeight;
    const imageContainer = imageContainerRef.current;
    if (imageContainer) {
      const imageHeight = imageContainer.clientHeight;
      console.log(imageHeight);
      console.log(windowHeight);
      console.log(imageHeight < windowHeight);
      if (imageHeight < windowHeight && hasMore) {
        dispatch(changeOffset());
      }
    }
  };

  useEffect(() => {
    console.log("check scrollbar useEffect called");
    checkScrollbar();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScrollbar);
    return () => window.addEventListener("scroll", handleInfiniteScrollbar);
  }, []);

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

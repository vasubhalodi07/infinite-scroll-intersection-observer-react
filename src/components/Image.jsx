import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, fetchImage } from "../redux/imageSlice";

const limit = 9;

const Image = () => {
  const dispatch = useDispatch();
  const { data, page, isInitialCall, hasMore } = useSelector(
    (state) => state.imageKey
  );

  const loadingRef = useRef(null);

  const [loadedImages, setLoadedImages] = useState({});
  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  useEffect(() => {
    if (hasMore) {
      dispatch(fetchImage({ page: page, limit: limit }));
    }
  }, [dispatch, page, hasMore]);

  useEffect(() => {
    if (!loadingRef.current) return;

    const loading = loadingRef.current;
    const loadingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInitialCall) {
          dispatch(changePage());
        }
      },
      {
        threshold: 1,
      }
    );

    loadingObserver.observe(loading);
    return () => {
      if (loading) loadingObserver.unobserve(loading);
    };
  }, [data]);

  return (
    <div>
      <div className="fetch-image">
        <div className="image-div">
          {data &&
            data.map((item, index) => (
              <div key={index} className="image-details">
                <div>{item.title}</div>
                <div className="image-con">
                  <img
                    src={item.images[0]}
                    alt="image"
                    onLoad={() => handleImageLoad(index)}
                    className={loadedImages[index] ? "loaded" : "not-loaded"}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {hasMore && (
        <div ref={loadingRef}>
          <div className="loader">
            <div className="spin" />
          </div>
        </div>
      )}

      {!hasMore && <div className="record"> Record Fetched... </div>}
    </div>
  );
};

export default Image;

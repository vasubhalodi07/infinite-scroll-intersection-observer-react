import axios from "axios";
import { useEffect, useRef, useState } from "react";

const limit = 9;
const Image = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isInitialCall, setIsInitialCall] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(null);

  const fetchImage = async () => {
    try {
      await axios
        .get(
          `https://dummyjson.com/products?limit=${limit}&skip=${
            (page - 1) * limit
          }`
        )
        .then((response) => {
          console.log(response.data);
          setIsInitialCall(false);
          setData((prev) => {
            const newData = [...prev, ...response.data.products];
            return newData;
          });
          if (response.data.skip > response.data.total) {
            setHasMore(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      setHasMore(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (hasMore) {
      console.log("called useEffect");
      fetchImage();
    }
  }, [page, hasMore]);

  useEffect(() => {
    if (!loadingRef.current) return;

    const loading = loadingRef.current;
    const loadingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInitialCall) {
          setPage((page) => page + 1);
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
                  <img src={item.images[0]} alt="image" />
                </div>
              </div>
            ))}
        </div>
      </div>

      {hasMore && (
        <div ref={loadingRef}>
          <div className="loader">
            <div className="spin" />
            <span className="loader_text">Loading More Record..</span>
          </div>
        </div>
      )}

      {!hasMore && <div className="record"> Record Fetched... </div>}
    </div>
  );
};

export default Image;

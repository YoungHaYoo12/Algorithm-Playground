import React from "react";

function getSVG(svg, height, width) {
  if (svg === "truck") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        className="bi bi-truck"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5v7h-1v-7a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5v1A1.5 1.5 0 0 1 0 10.5v-7zM4.5 11h6v1h-6v-1z"
        />
        <path
          fillRule="evenodd"
          d="M11 5h2.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5h-1v-1h1a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4.5h-1V5zm-8 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        />
        <path
          fillRule="evenodd"
          d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        />
      </svg>
    );
  } else if (svg === "geoAlt") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        className="bi bi-geo-alt"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        />
      </svg>
    );
  } else if (svg === "tree") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        className="bi bi-tree-fill"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: "white" }}
      >
        <path
          fillRule="evenodd"
          d="M8 0a.5.5 0 0 1 .416.223l3 4.5A.5.5 0 0 1 11 5.5h-.098l2.022 3.235a.5.5 0 0 1-.424.765h-.191l1.638 3.276a.5.5 0 0 1-.447.724h-11a.5.5 0 0 1-.447-.724L3.69 9.5H3.5a.5.5 0 0 1-.424-.765L5.098 5.5H5a.5.5 0 0 1-.416-.777l3-4.5A.5.5 0 0 1 8 0z"
        />
        <path d="M7 13h2v3H7v-3z" />
      </svg>
    );
  } else if (svg === "cone") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        className="bi bi-cone"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: "white" }}
      >
        <path d="M7.03 1.88c.252-1.01 1.688-1.01 1.94 0L12 14H4L7.03 1.88z" />
        <path
          fillRule="evenodd"
          d="M1.5 14a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1H2a.5.5 0 0 1-.5-.5z"
        />
      </svg>
    );
  } else if (svg === "easel") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        className="bi bi-easel"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8.473.337a.5.5 0 0 0-.946 0L6.954 2h2.092L8.473.337zM12.15 11h-1.058l1.435 4.163a.5.5 0 0 0 .946-.326L12.15 11zM8.5 11h-1v2.5a.5.5 0 0 0 1 0V11zm-3.592 0H3.85l-1.323 3.837a.5.5 0 1 0 .946.326L4.908 11z" />
        <path
          fillRule="evenodd"
          d="M14 3H2v7h12V3zM2 2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"
        />
      </svg>
    );
  } else if (svg === "gear") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 16 16"
        className="bi bi-gear-fill"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"
        />
      </svg>
    );
  }
}

export { getSVG };

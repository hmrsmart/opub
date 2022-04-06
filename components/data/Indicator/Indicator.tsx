import Radio from 'components/layouts/Radio';
import { RadioItem } from 'components/layouts/Radio/Radio';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Indicator = ({ data, newIndicator, meta }) => {
  const indicatorRef = useRef(null);
  useEffect(() => {
    indicatorRef.current
      .querySelector(`label`)
      .setAttribute('data-selected', 'true');
    (
      document.querySelector(
        `[data-id="${data[0]}"] > input`
      ) as HTMLInputElement
    ).checked = true;

    indicatorRef.current
      .querySelectorAll(`label`)
      .forEach((elm) => elm.addEventListener('click', handleIndicatorChange));
  }, [data]);

  function handleIndicatorChange(e: any) {
    // e.stopPropagation();
    e.preventDefault();
    const elm = e.target;
    console.log(e);

    elm.querySelector(`input`).checked = true;

    newIndicator(elm.dataset.id);
    if (document.querySelector(`[data-selected="true"]`) !== elm) {
      // set previous selected indicator as false
      document
        .querySelector(`[data-selected="true"]`)
        .setAttribute('data-selected', 'false');

      // select current indicator
      elm.setAttribute('data-selected', 'true');
    }
  }

  return (
    <IndicatorWrapper className="indicator">
      <h3>Indicators</h3>
      <fieldset ref={indicatorRef}>
        <legend className="sr-only">Choose Indicator:</legend>
        {data &&
          data.map(
            (item, index) =>
              item && (
                <Radio
                  // onClick={(e) => handleIndicatorChange(e)}
                  color="var(--color-amazon-300)"
                  data-id={item}
                  data-selected="false"
                  id={item}
                  text={
                    <>
                      {item}
                      <Info>
                        <p>{meta[index]}</p>
                      </Info>
                    </>
                  }
                  name="indicators"
                  key={`indicatorItem-${index}`}
                />
              )
          )}
      </fieldset>
    </IndicatorWrapper>
  );
};

export default Indicator;

const Info = styled.div`
  display: none;
  font-weight: 400;
  line-height: 1.7;
  font-size: 0.75rem;
  color: var(--text-light-medium);
  grid-column: 2/3;
`;

export const IndicatorWrapper = styled.div`
  scrollbar-width: thin;
  background-color: #fff;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
  border: 1px solid hsl(300, 10%, 94%);
  border-radius: 4px;
  height: max-content;
  max-height: 776px;
  padding: 1.5rem;
  height: 100%;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ${RadioItem} {
    line-height: 1.7;
    margin-top: 1rem;
    color: var(--text-light-high);
    letter-spacing: 0.01em;
    padding: 8px;

    &[data-selected='true'] {
      font-weight: 600;
      background-color: var(--color-grey-600);
    }

    input {
      pointer-events: none;
    }

    input:checked {
      + ${Info} {
        display: block;
      }
    }
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

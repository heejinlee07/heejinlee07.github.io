---
title: react-table
date: 2021-07-21
tags: TypeScript
---

## headless UI

실제 UI 요소를 제공하거나 렌더하지 않지만 라이브러리가 제공하는 state와 callback hooks를 통해서 테이블 마크업을 커스텀할 수 있다.

headless user interface component는 아무런 인터페이스를 제공하지 않음으로써 최대의 시각적 유연성을 제공하는 컴포넌트이다. *유저 인터페이스가 없는 유저 인터페이스*라고 할 수 있다. 이는 컴포넌트의 로직과 동작을 시각적 표현에서 분리하는 것이다.

<CoinFlip/>를 예로 들자면 이 컴포넌트를 child component의 함수로 쓰거나 prop을 렌더하는 식으로 사용한다.

```javascript
const flip = () => ({
  flipResults: Math.random(),
});

class CoinFlip extends React.Component {
  state = flip();

  handleClick = () => {
    this.setState(flip);
  };

  render() {
    return this.props.children({
      rerun: this.handleClick,
      isHeads: this.state.flipResults < 0.5,
    });
  }
}
```

위 함수는 headless이다. 아무것도 렌더하지 않기 때문이다. 이 함수는 다양한 consumer들이 여러 논리적인 처리를 하면서 프레젠테이션 작업도 할 것을 기대하고 있다. 따라서 어플리케이션 코드는 다음과 같다.

```javascript
<CoinFlip>
  {({ rerun, isHeads }) => (
    <>
      <button onClick={rerun}>Reflip</button>
      {isHeads ? (
        <div>
          <img src='/heads.svg' alt='Heads' />
        </div>
      ) : (
        <div>
          <img src='/tails.svg' alt='Tails' />
        </div>
      )}
    </>
  )}
</CoinFlip>
```

여기서는 render prop을 받는 것으로 headless가 구현되었는데, HOC로 구현될 수도 있다.
혹은 View와 Controller, ViewModel과 View의 패턴으로 구현될 수도 있다. 여러 방법이 있겠지만 여기서 중요한 점은 동전을 뒤집는 매커니즘과 그 매커니즘의 인터페이스를 분리했다는 것이다.

## react-table

모든 `React Table`에서는 useTable hook과 `table instance 객체`가 리턴된다. 이 `table instance 객체`는 table을 만들고, table의 state와 상호작용할 수 있는 모든 것을 포함한다.

### getting your data

테이블 구조를 생각해보면 보통 rows(행)과 columns(열)로 구성된 구조를 떠올린다. 그렇지만 테이블 구성이 단순히 행과 열의 조합으로 생각하기에는 중첩된 columns(열)과 행 등의 구조를 가질 수 있는 등 점점 복잡한 구조를 가지기 때문에 **아래와 같은 구조로 기본 데이터 구조를 정의한다.**

```javascript
const data = React.useMemo(
  () => [
    {
      col1: 'Hello',
      col2: 'World',
    },
    {
      col1: 'react-table',
      col2: 'rocks',
    },
    {
      col1: 'whatever',
      col2: 'you want',
    },
  ],
  []
);
```

<u>여기서 중요한 점은 useMemo를 사용했다는 것이다.</u> 이는 데이터가 매번 렌더될 때마다 새롭게 생성되지 않음을 보장하는 것이다. 만약 useMemo를 쓰지 않는다면 table은 렌더될 때마다 새로운 데이터를 받았다고 생각하기 때문에 매번 많은 로직은 새로 계산하려고 시도하게 된다.

### Define Columns

useTable hook에 전달하기 위해 column에 대한 정의를 한다. 역시 마찬가지로 useMemo를 사용했기 때문에 매번 렌더될 때마다 새롭게 계산하지 않고, value를 기억해뒀다가 메모제이션된 value와 실제 value에 차이가 있을 때만 변화시킨다.

```javascript
const columns = React.useMemo(
  () => [
    {
      Header: 'Column 1',
      accessor: 'col1', // accessor is the "key" in the data
    },
    {
      Header: 'Column 2',
      accessor: 'col2',
    },
  ],
  []
);
```

### Using the useTable hook

위에서 작성한 data와 column에 대한 정의를 가지고 useTable hook에 전달하여 새로운 table instance를 생성할 수 있다. 즉 useTable은 최소 메모제이션된 columns와 data를 포함한 객체를 제공받아야 한다.

```javascript
const tableInstance = useTable({ columns, data });
```

### Building a basic table UI

table instance는 만들었지만 아직 테이블 마크업과 스타일은 하지 않은 상태이므로 기본적인 테이블 구조를 작성해준다.

```javascript
return (
  <table>
    <thead>
      <tr>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
      </tr>
    </tbody>
  </table>
);
```

### Applying the table instance to markup

이제 기본적인 테이블 구조를 작성했으니 이를 이용해서 tableInstance를 얻을 수 있다. 이를 이용해 테이블 작성을 완료할 수 있다.

```javascript
const tableInstance = useTable({ columns, data });

const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  tableInstance;

return (
  // apply the table props
  <table {...getTableProps()}>
    <thead>
      {
        // Loop over the header rows
        headerGroups.map((headerGroup) => (
          // Apply the header row props
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
              // Loop over the headers in each row
              headerGroup.headers.map((column) => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  {
                    // Render the header
                    column.render('Header')
                  }
                </th>
              ))
            }
          </tr>
        ))
      }
    </thead>
    {/* Apply the table body props */}
    <tbody {...getTableBodyProps()}>
      {
        // Loop over the table rows
        rows.map((row) => {
          // Prepare the row for display
          prepareRow(row);
          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              {
                // Loop over the rows cells
                row.cells.map((cell) => {
                  // Apply the cell props
                  return (
                    <td {...cell.getCellProps()}>
                      {
                        // Render the cell contents
                        cell.render('Cell')
                      }
                    </td>
                  );
                })
              }
            </tr>
          );
        })
      }
    </tbody>
  </table>
);
```

### Final Result

앞의 모든 과정을 한번에 표현해보면 다음과 같다.

```javascript
import { useTable } from 'react-table';

function App() {
  const data = React.useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
```

### Hook Usage

`React Table`은 리액트 훅은 내외부에서 사용하여 구성하고, lifecycle를 관리한다. 그리고 기본적으로 custom react hook과 호환되는 hook을 가진다.

`useTable`은 가장 기본적으로 사용되는 훅인데, 모든 옵션과 플러그인 훅의 스타팅 포인트로 제공된다. 옵션이 `useTable`로 전달되면 제공받은 순서대로 모든 플러그인 훅으로 전달되고, 최종 instance를 만들어 결과적으로 table state와 상호작용하는 나만의 table UI를 만들 수 있다.

```javascript
 const instance = useTable(
   {
     data: [...],
     columns: [...],
   },
   useGroupBy,
   useFilters,
   useSortBy,
   useExpanded,
   usePagination
 )
```

### The stages of `React Table` and plugins

1. useTable이 호출되어 table instance가 만들어진다.
2. instance.state는 custom user state나 자동으로 생성된 것으로 resolve된다.
3. 플러그인 포인트들의 컬렉션은 instance.hooks에 생성된다.
4. 각 플러그인은 instance.hook에 hook을 추가할 수 있다.
5. useTable 로직이 실행되면서 각 플러그인 훅 type은 등록된 순서대로 개별 hook 함수가 실행되는 순서에 따라 특정 시점에서 사용된다.
6. useTable로부터 최종적인 instance 객체를 얻고, 이를 이용해 개발자가 자신만의 테이블을 만들 수 있다.

### Plugin Hook Order & Consistency

플러그인 hook의 순서와 사용은 다른 custom hooks가 그러하듯 항상 같은 순서로 호출되어야 한다는 hooks의 법칙에 따른다.

### Option Memoization

`React Table`은 state와 사이드 이펙트를 업데이트하거나 계산해야하는 타이밍을 메모제이션에 의존한다. 이 말은 모든 옵션이 useTable에 전달될 때 useMemo 또는 useCallback으로 메모제이션되어야 한다는 의미이다.

---

[HEADLESS USER INTERFACE COMPONENTS](https://www.merrickchristensen.com/articles/headless-user-interface-components/)
[`React Table` - overview](https://react-table.tanstack.com/docs/overview)
[`React Table` - Quick Start](https://react-table.tanstack.com/docs/quick-start)
[`React Table` - Overview](https://react-table.tanstack.com/docs/api/overview)

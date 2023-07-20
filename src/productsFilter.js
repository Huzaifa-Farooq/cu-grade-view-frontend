import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


class SearchForm extends React.Component {
  constructor(props){
    super(props);

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleStockOnlyChange = this.handleStockOnlyChange.bind(this);
  }

  handleFilterTextChange(e){
    this.props.handleFilterTextChange(e.target.value);
  }

  handleStockOnlyChange(e){
    this.props.handleStockOnlyChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input onChange={this.handleFilterTextChange} value={this.props.searchText} placeholder='Search...' />
        <br />
        <input onChange={this.handleStockOnlyChange} checked={this.props.onlyStocked} type='checkbox'></input> <label>Only show products in stock</label>
      </form>
    );
  }
}

class ProductRow extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

function ProductCategoryRow(props){
  return (
    <tr>
      <th colSpan={2}>{props.productCategoryName}</th>
    </tr>
  );
}

class ProductTable extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const searchText = this.props.searchText;
    const onlyStocked = this.props.onlyStocked;

    var productsData = this.props.productsData;
    if (onlyStocked){
      productsData = productsData.filter((product) => product.stocked);
    }
    if (searchText){
      productsData = productsData.filter((product) => product.name.includes(searchText));
    }

    const categories = new Set(productsData.map((category) => category['category']));
    const rows = [];
    categories.forEach((category) => {
      rows.push(<ProductCategoryRow productCategoryName={category} />);
      productsData.forEach((product) => {
        if (product.category === category){
            rows.push(<ProductRow product={product} />);
        }
      });
    })
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchText: '',
      onlyStocked: false
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleStockOnlyChange = this.handleStockOnlyChange.bind(this);
  }

  handleFilterTextChange(value) {
    this.setState({searchText: value});
  }
  handleStockOnlyChange(value){
    this.setState({onlyStocked: value});
  }

  render(){
    const searchText = this.state.searchText;
    const onlyStocked = this.state.onlyStocked;

    return (
      <Fragment>
        <SearchForm 
          handleFilterTextChange={this.handleFilterTextChange} 
          handleStockOnlyChange={this.handleStockOnlyChange}
          searchText={searchText} 
          onlyStocked={onlyStocked} 
        />
        <ProductTable searchText={searchText} onlyStocked={onlyStocked} productsData={this.props.productsData} />  
      </Fragment>
    );
  }
}

const productsData = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<FilterableProductTable productsData={productsData} />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

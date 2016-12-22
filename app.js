const Product = React.createClass({
  handleUpVote: function() {
    this.props.onVote(this.props.id);
  },

  handleDownVote: function() {
    this.props.downVote(this.props.id);
  },

  render: function() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.product_image_url} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
              <i className="large caret up icon"></i>
            </a>
            {this.props.votes}
            <a onClick={this.handleDownVote}>
              <i className="large caret down icon"></i>
            </a>
          </div>
          <div className="description">
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitter_avatar_url} />
          </div>
        </div>
      </div>
    );
  }
});

const Sort = React.createClass({
  render: function() {
    return (
      <div className="ui container sort-wrapper">
        <button className="ui button sort-button--asc" onClick={() => {this.props.onSort('ascending')}}>Sort ascending</button>
        <button className="ui button sort-button--desc" onClick={() => {this.props.onSort('descending')}}>Sort descending</button>
      </div>
    );
  }
});

const ProductList = React.createClass({
  getInitialState: function() {
      return {
        products: [],
        sortDir: 'descending'
      };
  },

  componentWillMount: function() {
    this.setState({products: Data});
  },

  componentDidMount: function() {
    this.updateState();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(prevState.sortDir !== this.state.sortDir) {
      this.updateState();
    }
  },

  updateState: function() {
    let products = this.sortProducts(Data);

    this.setState({products});
  },

  sortProducts: function(products) {
    if(this.state.sortDir === 'descending') {
      products.sort((a, b) => {
        return b.votes - a.votes;
      });
    } else {
      products.sort((a, b) => {
        return a.votes - b.votes;
      });
    }

    return products;
  },

  changeSortDir: function(sortDir) {
    this.setState({sortDir});
  },

  handleProductUpVote: function(productId) {
    Data.forEach((el) => {
      if(el.id === productId) {
        ++el.votes;
        return;
      }
    });
    this.updateState();
  },

  handleProductDownVote: function(productId) {
    Data.forEach((el) => {
      if(el.id === productId) {
        --el.votes;
        return;
      }
    });
    this.updateState();
  },

  render: function() {
    let products = this.state.products.map((product) => {
      return (
        <Product
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onVote={this.handleProductUpVote}
          downVote={this.handleProductDownVote} />
      );
    });
    return (
      <div className="ui container items">
        <Sort
          onSort={this.changeSortDir} />
        {products}
      </div>
    )
  }
});

ReactDOM.render(<ProductList />, document.getElementById('content'));

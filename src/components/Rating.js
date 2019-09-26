import React from 'react'
import StarRatingComponent from 'react-star-rating-component';

class Rating extends React.Component {
  
  // constructor() {
  //   super();

  //   this.state = {
  //     rating: 1
  //   };
  // }

  onStarClick(nextValue, prevValue, name) {
    // this.setState({rating: nextValue});
    this.props.setRating(nextValue);
  }

  render() {
    // const { rating } = this.state;
    
    return (                
      <div>
        <StarRatingComponent 
          emptyStarColor={'#fff'}
          starColor={'#edb901'}
          name="rating" 
          starCount={5}
          value={this.props.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
export default Rating;
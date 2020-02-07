import React from 'react';
import './Home.css';
import {API_URL,API_KEY,IMAGE_BASE_URL,POSTER_SIZE,BACKDROP_SIZE} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
// import Swiper from '../elements/swiper';

class Home extends React.Component{
    state={
        movies:[],
        // HeroImage:null,
        HeroImage:[],
        loading:false,
        currentPage:0,
        totalPages:0,
        SearchTerm:'' 
    };


    componentDidMount(){
        this.setState({loading:true});
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endPoint)
    }

    searchItems = (SearchTerm)=>{

       // console.log(SearchTerm);
          
         let endPoint='';
         this.setState({
             movies:[],
             loading:true,
             SearchTerm
         });

         if(SearchTerm===''){
            endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
         }else{
            endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${SearchTerm}`;
         }
         this.fetchItems(endPoint);
    }

    loadMoreItems = ()=>{
        
        let endPoint='';
        this.setState({
            loading:true
        });

         if(this.state.SearchTerm === ''){
             endPoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage+1}`;
            
             
         }else {
             endPoint=`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.SearchTerm}&page=${this.state.currentPage+1}`;
         }
              
         this.fetchItems(endPoint);
         

    }

    fetchItems=(endPoint)=>{
        fetch(endPoint)
        .then(result=>result.json())
        .then(response=>{
            console.log(response);
            this.setState({
                movies:[...this.state.movies,...response.results],
                // HeroImage: this.state.HeroImage || response.results[6],
                 HeroImage:[response.results[0],response.results[1],response.results[3]],
                loading:false,
                currentPage:response.page,
                totalPages:response.total_pages
            });
        })
    }

    renderHeroImage=()=>{
        console.log(this.state.HeroImage);
        if(this.state.HeroImage){  
          this.state.HeroImage.map((item, i) => {
              //console.log(item.backdrop_path);
              if (i < 3) {
                console.log(item.original_title);
                 return (
                    
                    <div>
                        <HeroImage
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${item.backdrop_path}`}
                        title={item.original_title}
                        text={item.overview}
                        />
                        <SearchBar callback={this.searchItems}/>
                    </div>
             
                 )
             }   
            })
       }else{
           return null;
       }
   }

    

    render(){
        // console.log(this.state.HeroImage);
        // console.log(this.state.movies);
        return(
            <div className="rmdb-home">
            
                {
                this.renderHeroImage() 
                }
            
                
                <div className="rmdb-home-grid">
                <FourColGrid 
                header={this.state.SearchTerm?'Search Results':'Popular Movies'}
                loading={this.state.loading}
                >
                {this.state.movies.map((element,i)=>{
                    return <MovieThumb
                            key={i}
                            clickable={true}
                            image={element.poster_path?`${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`:'./images/no_image.jpg'}
                            movieId={element.id}
                            movieName={element.original_title}
                    />
                })}
                

                </FourColGrid>
                {this.state.loading?<Spinner/>:null}
                {(this.state.currentPage<=this.state.totalPages && !this.state.loading)?
                <LoadMoreBtn onClick={this.loadMoreItems}/>
                :null}
                </div>
                
            </div>
        );
    }
}

export default Home
import React, {useState} from 'react';
import {map} from 'lodash';
import './index.scss';
import {Divider} from 'antd';
import {useDispatch} from 'react-redux';
import {getPosts} from '../redux/actions';

const PostCategoryItem = ({title, id, selected, handleSelectCategory}) =>{
  return (
    <>
      <div className="post-category-item-wrapper" onClick={handleSelectCategory(id)}>
        <div className={`category-active ${selected? 'dot-selected': 'dot'}`}></div>
        <div className={`category-name ${selected? 'category-selected': null}`}>{title}</div>
      </div>
    </>
  );
};

export default function PostCategory({categories}) {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const handleSelectCategory = (id) => () =>{
    setSelectedCategory(id);
    if (id) {
      dispatch(getPosts({category_id: id}));
    } else {
      dispatch(getPosts({}));
    }
  };
  return (
    <>
      <div className="post-category-wrapper">
        <div className="category-title">Danh mục bài viết</div>
        <Divider className="m-10"/>
        <PostCategoryItem {...{title: 'Tất cả danh mục', id: 0, selected: selectedCategory === 0, handleSelectCategory}} />
        {categories && map(categories, (item) => (
          <PostCategoryItem key={item.id} {...{...item, selected: selectedCategory === item.id, handleSelectCategory}}/>
        ))}
      </div>
    </>
  );
}

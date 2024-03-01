import React, {useRef} from 'react';
import styles from './AddJoke.module.css';

const AddJoke = (props) => {
  const type = useRef();
  const setup = useRef();
  const punchline = useRef();

  const submit = (e) => {
    e.preventDefault();
    const joke = {
      type: type.current.value,
      setup: setup.current.value,
      punchline: punchline.current.value,
    }
    props.onAdd(joke);
    e.target.reset();
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <div className={styles.control}>
        <label htmlFor="type">Type</label>
        <input type="text" id='type' ref={type}/>
      </div>
      <div className={styles.control}>
        <label htmlFor="setup">Setup</label>
        <textarea rows={5} id='setup' ref={setup}></textarea>
      </div>
      <div className={styles.control}>
        <label htmlFor="punchline">Punchline</label>
        <textarea rows={5} id='punchline' ref={punchline}></textarea>
      </div>
      <button type='submit'>Add Joke</button>
    </form>
  );
};

export default AddJoke;

//
import React, { useState, useEffect } from "react";

const Form = () => {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");
  const [word, setWord] = useState("hello");
  const [wordDefinitions, setWordDefinitions] = useState({});
  const [error, setError] = useState(null);

  console.log(wordDefinitions);
  const getNewDefintions = () => {
    setLoading(true);
    setError(null);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`)
      .then((data) => data.json())
      .then((json) => {
        if (json.title) {
          setError(json.title);
          setLoading(false);
        } else {
          setWordDefinitions(json);
          setLoading(false);
        }

        console.log(json);
      });
  };

  useEffect(() => {
    getNewDefintions();
  }, []);

  const play = `//ssl.gstatic.com/dictionary/static/sounds/20200429/${word}--_gb_1.mp3`;

  return (
    <div className="Form">
      <div className="Choose">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">en</option>
          <option value="de">de</option>
          <option value="fr">fr</option>
          <option value="ru">ru</option>
        </select>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button onClick={() => getNewDefintions()}>Submit</button>
      </div>

      <ul className="Allinfo">
        {!loading && error === null
          ? wordDefinitions.map((definition, i) => {
              return (
                <div className="Screenoutput">
                  <h1 className="Defword">{definition.word}</h1>
                  <p>
                    <i>{definition.phonetic}</i>
                  </p>
                  <audio src={play} controls />
                  <br />
                  <p>Origin: {definition.origin}</p>
                  <br />
                  <hr />
                  <li key={i}>
                    <ul>
                      {definition.meanings.map((meaning, i) => {
                        return (
                          <li key={i}>
                            <p> {meaning.partOfSpeech}</p>

                            {meaning.definitions.map((definition, index) => {
                              return (
                                <div>
                                  <p className="Definition" key={index}>
                                    Definition: &nbsp;{definition.definition}
                                  </p>

                                  <p className="Example" key={index}>
                                    Example: {definition.example}
                                  </p>

                                  <div>
                                    <p>
                                      Synonyms:&nbsp;
                                      {definition.synonyms.length > 0
                                        ? definition.synonyms.map(
                                            (synonym, j) => {
                                              return <p key={j}>{synonym}, </p>;
                                            }
                                          )
                                        : "-"}
                                    </p>
                                  </div>
                                  <hr />
                                </div>
                              );
                            })}
                            <br />
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </div>
              );
            })
          : error && <i className="Err">{error}</i>}
      </ul>
    </div>
  );
};

export default Form;
